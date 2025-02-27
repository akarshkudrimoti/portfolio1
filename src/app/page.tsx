'use client';
import { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [isSmiling, setIsSmiling] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await tf.ready();
        await Promise.all([
          tf.setBackend('webgl'),
          tf.setBackend('cpu'),
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceExpressionNet.loadFromUri('/models')
        ]);
        startVideo();
      } catch (error) {
        console.error('Error loading models:', error);
      }
    };
    loadModels();
  }, []);

  const startVideo = async () => {
    if (videoRef.current) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: 640,
            height: 480,
            facingMode: 'user'
          } 
        });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    }
  };

  const handleVideoPlay = () => {
    let smileCount = 0;
    const interval = setInterval(async () => {
      if (videoRef.current && canvasRef.current) {
        try {
          const detections = await faceapi
            .detectSingleFace(
              videoRef.current, 
              new faceapi.TinyFaceDetectorOptions()
            )
            .withFaceExpressions();

          if (detections) {
            const happyScore = detections.expressions.happy;
            console.log('Smile score:', happyScore);
            
            if (happyScore > 0.8) {
              smileCount++;
              if (smileCount >= 1) {
                setIsSmiling(true);
                if (videoRef.current.srcObject) {
                  const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
                  tracks.forEach(track => track.stop());
                }
                clearInterval(interval);
                router.push('/terminal');
                return;
              }
            }

            // Draw face detection
            const canvas = canvasRef.current;
            const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
            faceapi.matchDimensions(canvas, displaySize);

            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.strokeStyle = '#00ff00'; // Green color
              ctx.lineWidth = 2;

              const box = detections.detection.box;
              ctx.strokeRect(box.x, box.y, box.width, box.height);
            }
          }
        } catch (error) {
          console.error('Detection error:', error);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] p-4">
      <div className="space-y-8 text-center max-w-2xl relative">
        <div className="absolute inset-0 bg-green-500/5 animate-pulse rounded-lg" />
        
        <h1 className="text-4xl font-bold tracking-tighter text-green-500 glitch-text">
          SYSTEM ACCESS REQUIRED
        </h1>
        <p className="text-xl text-green-400/70 font-mono">
          BIOMETRIC AUTHENTICATION INITIALIZED
        </p>
        
        <div className="relative w-[640px] h-[480px] rounded-lg overflow-hidden border-2 border-green-500/50 shadow-lg shadow-green-500/20">
          <div className="absolute inset-0 bg-green-500/5 animate-pulse" />
          <video
            ref={videoRef}
            autoPlay
            muted
            onPlay={handleVideoPlay}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <canvas ref={canvasRef} className="absolute inset-0" />
          <div className="absolute inset-0 pointer-events-none border border-green-500/20">
            <div className="absolute top-0 left-0 border-t border-l border-green-500/50 w-16 h-16" />
            <div className="absolute top-0 right-0 border-t border-r border-green-500/50 w-16 h-16" />
            <div className="absolute bottom-0 left-0 border-b border-l border-green-500/50 w-16 h-16" />
            <div className="absolute bottom-0 right-0 border-b border-r border-green-500/50 w-16 h-16" />
          </div>
        </div>

        <div className="space-y-4">
          <Button 
            variant="outline"
            onClick={() => setIsSmiling(true)}
            className="w-full max-w-sm border-green-500 text-green-500 hover:bg-green-500/10"
          >
            OVERRIDE AUTHENTICATION
          </Button>
          <p className="text-sm text-green-400/50 font-mono">
            MANUAL OVERRIDE: <Link href="/terminal" className="text-green-500 underline hover:text-green-400">CLICK HERE</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
