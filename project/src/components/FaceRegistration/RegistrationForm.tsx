import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, User, Briefcase } from 'lucide-react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import Alert from '../UI/Alert';
import { getFaceDescriptor } from '../../services/faceRecognitionService';
import { saveUser } from '../../services/userService';
import { generateId } from '../../utils/helpers';
import { User as UserType } from '../../types';

const RegistrationForm: React.FC = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [capture, setCapture] = useState<string | null>(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const webcamRef = useRef<Webcam>(null);
  
  const checkForFace = useCallback(async () => {
    if (!webcamRef.current) return;
    
    const video = webcamRef.current.video;
    if (!video) return;
    
    try {
      const descriptor = await getFaceDescriptor(video);
      setFaceDetected(!!descriptor);
    } catch (err) {
      console.error('Error checking for face:', err);
    }
  }, []);
  
  // Check for face periodically
  React.useEffect(() => {
    const intervalId = setInterval(checkForFace, 1000);
    return () => clearInterval(intervalId);
  }, [checkForFace]);
  
  const captureImage = useCallback(() => {
    if (!webcamRef.current) return;
    
    const imageSrc = webcamRef.current.getScreenshot();
    setCapture(imageSrc);
  }, [webcamRef]);
  
  const retakeImage = () => {
    setCapture(null);
    setFaceDetected(false);
  };
  
  const registerUser = async () => {
    if (!name || !role || !capture) {
      setError('Please fill in all fields and take a photo');
      return;
    }
    
    if (!webcamRef.current || !webcamRef.current.video) {
      setError('Camera not initialized');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Create image element from screenshot for processing
      const img = new Image();
      img.src = capture;
      
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
      });
      
      const descriptor = await getFaceDescriptor(img);
      
      if (!descriptor) {
        setError('Failed to detect face in the captured image. Please try again.');
        setLoading(false);
        return;
      }
      
      const newUser: UserType = {
        id: generateId(),
        name,
        role,
        imageDescriptor: descriptor,
        image: capture,
      };
      
      saveUser(newUser);
      
      // Reset form
      setName('');
      setRole('');
      setCapture(null);
      setSuccess('User registered successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      console.error('Error registering user:', err);
      setError('Failed to register user. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card title="Register New User" className="max-w-3xl mx-auto">
      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
      {success && <Alert type="success" message={success} onClose={() => setSuccess(null)} />}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                placeholder="Enter full name"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                placeholder="Enter role (e.g., Student, Teacher)"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="relative border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-100 aspect-[4/3]">
            {!capture ? (
              <>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{ facingMode: 'user' }}
                  className="w-full h-full object-cover"
                />
                {faceDetected && (
                  <div className="absolute top-0 left-0 right-0 p-2 bg-success-500 bg-opacity-90 text-white text-sm flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Face detected
                  </div>
                )}
              </>
            ) : (
              <img src={capture} alt="Captured" className="w-full h-full object-cover" />
            )}
          </div>
          
          <div className="flex space-x-2">
            {!capture ? (
              <Button 
                onClick={captureImage} 
                leftIcon={<Camera className="h-5 w-5" />}
                disabled={!faceDetected}
                fullWidth
              >
                Capture Photo
              </Button>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={retakeImage}
                  className="flex-1"
                >
                  Retake
                </Button>
                <Button 
                  onClick={registerUser} 
                  isLoading={loading}
                  className="flex-1"
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RegistrationForm;