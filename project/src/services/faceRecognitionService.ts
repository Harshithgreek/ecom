import * as faceapi from 'face-api.js';
import { User } from '../types';

// Update model URL to use the correct path relative to public directory
const MODEL_URL = '/models';

let modelsLoaded = false;

export const loadModels = async (): Promise<void> => {
  if (modelsLoaded) return;
  
  try {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    ]);
    modelsLoaded = true;
    console.log('Face recognition models loaded successfully');
  } catch (error) {
    console.error('Error loading models:', error);
    throw new Error('Failed to load face recognition models');
  }
};

export const detectFace = async (
  imageElement: HTMLImageElement | HTMLVideoElement
): Promise<faceapi.FaceDetection | null> => {
  try {
    const detections = await faceapi.detectSingleFace(
      imageElement,
      new faceapi.TinyFaceDetectorOptions()
    );
    return detections || null;
  } catch (error) {
    console.error('Error detecting face:', error);
    return null;
  }
};

export const getFaceDescriptor = async (
  imageElement: HTMLImageElement | HTMLVideoElement
): Promise<Float32Array | null> => {
  try {
    const detection = await faceapi
      .detectSingleFace(imageElement, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();
    
    return detection?.descriptor || null;
  } catch (error) {
    console.error('Error getting face descriptor:', error);
    return null;
  }
};

export const matchFace = (
  descriptor: Float32Array,
  registeredUsers: User[]
): User | null => {
  if (registeredUsers.length === 0) return null;

  // Convert user descriptors from storage format if needed
  const labeledDescriptors = registeredUsers.map(user => {
    const descriptor = user.imageDescriptor instanceof Float32Array
      ? user.imageDescriptor
      : new Float32Array(user.imageDescriptor as unknown as number[]);
      
    return new faceapi.LabeledFaceDescriptors(user.id, [descriptor]);
  });

  const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
  const match = faceMatcher.findBestMatch(descriptor);

  if (match.label !== 'unknown') {
    const matchedUser = registeredUsers.find(user => user.id === match.label);
    return matchedUser || null;
  }

  return null;
};