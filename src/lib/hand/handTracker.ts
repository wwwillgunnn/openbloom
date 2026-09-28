import {
  FilesetResolver,
  HandLandmarker,
  type HandLandmarkerResult,
} from "@mediapipe/tasks-vision";

export type HandSide = "left" | "right";

export type HandState = {
  detected: boolean;
  isOpen: boolean;
  pinchDistance: number;
  landmarks: Array<{
    x: number;
    y: number;
    z: number;
  }> | null;
};

export type HandsState = {
  left: HandState;
  right: HandState;
};

const emptyHand = (): HandState => ({
  detected: false,
  isOpen: false,
  pinchDistance: 0,
  landmarks: null,
});

export const emptyHandsState = (): HandsState => ({
  left: emptyHand(),
  right: emptyHand(),
});

let handLandmarker: HandLandmarker | null = null;

/**
 * Load MediaPipe's Hand Landmarker.
 *
 * This only needs to happen once.
 */
export async function createHandLandmarker() {
  if (handLandmarker) {
    return handLandmarker;
  }

  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm",
  );

  handLandmarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
      delegate: "GPU",
    },

    runningMode: "VIDEO",

    numHands: 2,

    minHandDetectionConfidence: 0.5,
    minHandPresenceConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });

  return handLandmarker;
}

/**
 * Calculate Euclidean distance between two landmarks.
 */
function distance(
  a: { x: number; y: number; z: number },
  b: { x: number; y: number; z: number },
) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * Determine whether a finger is extended.
 *
 * Uses distances rather than just Y positions so that
 * the hand can be rotated.
 */
function isFingerExtended(
  mcp: { x: number; y: number; z: number },
  pip: { x: number; y: number; z: number },
  tip: { x: number; y: number; z: number },
) {
  const tipToMcp = distance(tip, mcp);
  const pipToMcp = distance(pip, mcp);

  return tipToMcp > pipToMcp * 1.25;
}

/**
 * Determine whether the hand is open.
 *
 * We primarily care about the four non-thumb fingers.
 */
function isHandOpen(landmarks: HandLandmarkerResult["landmarks"][number]) {
  const indexOpen = isFingerExtended(landmarks[5], landmarks[6], landmarks[8]);

  const middleOpen = isFingerExtended(
    landmarks[9],
    landmarks[10],
    landmarks[12],
  );

  const ringOpen = isFingerExtended(
    landmarks[13],
    landmarks[14],
    landmarks[16],
  );

  const pinkyOpen = isFingerExtended(
    landmarks[17],
    landmarks[18],
    landmarks[20],
  );

  const openFingers = [indexOpen, middleOpen, ringOpen, pinkyOpen].filter(
    Boolean,
  ).length;

  return openFingers >= 3;
}

/**
 * Convert MediaPipe's result into the state our application needs.
 */
export function processHandResult(result: HandLandmarkerResult): HandsState {
  const state = emptyHandsState();

  for (let i = 0; i < result.landmarks.length; i++) {
    const landmarks = result.landmarks[i];

    const handedness = result.handednesses[i]?.[0];

    if (!handedness) continue;

    const side: HandSide =
      handedness.categoryName.toLowerCase() === "left" ? "left" : "right";

    /**
     * MediaPipe landmark:
     *
     * 4 = thumb tip
     * 8 = index finger tip
     */
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];

    const pinchDistance = distance(thumbTip, indexTip);

    state[side] = {
      detected: true,

      /**
       * Only really relevant for the left hand,
       * but calculating it for both keeps the state simple.
       */
      isOpen: isHandOpen(landmarks),

      /**
       * Raw normalized distance between thumb and
       * index finger.
       */
      pinchDistance,

      landmarks: landmarks.map((landmark) => ({
        x: landmark.x,
        y: landmark.y,
        z: landmark.z,
      })),
    };
  }

  return state;
}

export async function detectHands(video: HTMLVideoElement, timestamp: number) {
  const tracker = await createHandLandmarker();

  const result = tracker.detectForVideo(video, timestamp);

  return processHandResult(result);
}

export function closeHandLandmarker() {
  handLandmarker?.close();
  handLandmarker = null;
}
