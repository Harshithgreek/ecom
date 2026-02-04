import React, { useState, useRef, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import { ChevronRight, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import Alert from '../UI/Alert';
import { loadModels, getFaceDescriptor, matchFace } from '../../services/faceRecognitionService';
import { getUsers } from '../../services/userService';
import { saveAttendanceRecord, isUserPresentToday } from '../../services/attendanceService';
import { format } from 'date-fns';
import { generateId, formatTime } from '../../utils/helpers';
import { User } from '../../types';

const FaceScanner: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [recognizedUser, setRecognizedUser] = useState<User | null>(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

  const webcamRef = useRef<Webcam>(null);
  const scanIntervalRef = useRef<number | null>(null);

  // Load face recognition models on component mount
  useEffect(() => {
    const initModels = async () => {
      try {
        setLoading(true);
        await loadModels();
        setModelsLoaded(true);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load models:', err);
        setError('Failed to initialize face recognition. Please refresh the page.');
        setLoading(false);
        setModelsLoaded(false);
      }
    };

    initModels();

    return () => {
      // Clear intervals when component unmounts
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
      }
    };
  }, []);

  const checkForFace = useCallback(async () => {
    if (!webcamRef.current?.video || !modelsLoaded || !cameraReady) return;

    try {
      const descriptor = await getFaceDescriptor(webcamRef.current.video);
      setFaceDetected(!!descriptor);
    } catch (err) {
      console.error('Error checking for face:', err);
      setFaceDetected(false);
    }
  }, [modelsLoaded, cameraReady]);

  // Check for face periodically
  useEffect(() => {
    if (!modelsLoaded || !cameraReady) return;

    const intervalId = setInterval(checkForFace, 1000);
    return () => clearInterval(intervalId);
  }, [checkForFace, modelsLoaded, cameraReady]);

  const startScanning = useCallback(() => {
    if (scanning || !modelsLoaded || !cameraReady) return;

    setScanning(true);
    setError(null);
    setSuccess(null);

    scanIntervalRef.current = window.setInterval(async () => {
      if (!webcamRef.current?.video) return;

      try {
        const descriptor = await getFaceDescriptor(webcamRef.current.video);

        if (!descriptor) {
          setFaceDetected(false);
          return;
        }

        setFaceDetected(true);

        const users = getUsers();
        const matched = matchFace(descriptor, users);

        if (matched) {
          // Clear interval
          if (scanIntervalRef.current) {
            clearInterval(scanIntervalRef.current);
            scanIntervalRef.current = null;
          }

          setScanning(false);
          setRecognizedUser(matched);

          // Check if user already marked attendance today
          if (isUserPresentToday(matched.id)) {
            setSuccess(`Welcome back, ${matched.name}! Your attendance was already marked for today.`);
          } else {
            // Mark attendance
            const now = new Date();
            const record = {
              id: generateId(),
              userId: matched.id,
              userName: matched.name,
              checkInTime: now.toISOString(),
              date: format(now, 'yyyy-MM-dd'),
            };

            saveAttendanceRecord(record);
            setSuccess(`Welcome, ${matched.name}! Your attendance has been marked at ${formatTime(now)}.`);
          }
        }
      } catch (err) {
        console.error('Error during scanning:', err);
        setError('Error during scanning. Please try again.');
        setScanning(false);

        if (scanIntervalRef.current) {
          clearInterval(scanIntervalRef.current);
          scanIntervalRef.current = null;
        }
      }
    }, 1500);
  }, [scanning, modelsLoaded, cameraReady]);

  const stopScanning = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }

    setScanning(false);
  };

  const resetScanner = () => {
    setRecognizedUser(null);
    setSuccess(null);
    setError(null);
  };

  const handleUserMedia = () => {
    setCameraReady(true);
  };

  const handleUserMediaError = () => {
    setError('Failed to access camera. Please ensure camera permissions are granted.');
    setCameraReady(false);
  };

  return (
    <Card title="Attendance Scanner" className="max-w-3xl mx-auto">
      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
      {success && <Alert type="success" message={success} onClose={() => setSuccess(null)} />}

      <div className="text-center">
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center">
            <Loader className="h-10 w-10 text-primary-400 animate-spin mb-4" />
            <p className="text-gray-400">Loading face recognition models...</p>
          </div>
        ) : recognizedUser ? (
          <div className="py-8 bg-dark-800/60 rounded-xl border border-primary-500/20 animate-fade-in">
            <div className="h-24 w-24 mx-auto rounded-full overflow-hidden border-4 border-success-500 mb-4 shadow-lg shadow-success-500/20">
              <img src={recognizedUser.image} alt={recognizedUser.name} className="h-full w-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{recognizedUser.name}</h3>
            <p className="text-gray-400 mb-6">{recognizedUser.role}</p>

            <div className="flex justify-center">
              <Button
                onClick={resetScanner}
                rightIcon={<ChevronRight className="h-5 w-5" />}
              >
                Scan Another
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative border-2 border-primary-500/30 rounded-xl overflow-hidden bg-dark-800/60 aspect-[4/3] max-w-md mx-auto">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  facingMode: "user",
                  width: 640,
                  height: 480
                }}
                className="w-full h-full object-cover"
                onUserMedia={handleUserMedia}
                onUserMediaError={handleUserMediaError}
              />

              {faceDetected && !scanning && (
                <div className="absolute top-0 left-0 right-0 p-2 bg-success-600/90 text-white text-sm flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Face detected
                </div>
              )}

              {scanning && (
                <div className="absolute inset-0 flex items-center justify-center bg-dark-950/50 backdrop-blur-sm">
                  <div className="bg-dark-800/80 p-4 rounded-full border border-primary-500/30">
                    <div className="h-16 w-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center">
              {!scanning ? (
                <Button
                  onClick={startScanning}
                  size="lg"
                  disabled={!faceDetected || !modelsLoaded || !cameraReady}
                >
                  Start Scanning
                </Button>
              ) : (
                <Button
                  onClick={stopScanning}
                  variant="outline"
                  size="lg"
                >
                  Cancel
                </Button>
              )}
            </div>

            <div className="text-sm text-gray-500">
              <p>Position your face clearly in the frame for best results.</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default FaceScanner;