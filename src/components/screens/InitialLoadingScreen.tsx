import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plane } from "lucide-react";
import cathayXplorerLogo from "figma:asset/8ca4e381d39159a5371e2283657adc579fd30f09.png";

interface InitialLoadingScreenProps {
  isVisible: boolean;
}

export function InitialLoadingScreen({ isVisible }: InitialLoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 bg-gradient-to-br from-[#006564] via-[#367D79] to-[#367D79] flex items-center justify-center z-[9999]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-white/5"
          style={{ top: '10%', left: '10%' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-white/5"
          style={{ bottom: '15%', right: '15%' }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-8"
        >
          <motion.img
            src={cathayXplorerLogo}
            alt="Cathay Xplorer"
            className="w-80 h-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </motion.div>

        {/* Loading bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="w-64 mt-8"
        >
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-white to-[#C1B49A]"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-center text-white/60 text-sm mt-3">
            Preparing your experience...
          </p>
        </motion.div>

        {/* Asia Miles integration badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-20 flex items-center gap-2 text-white/50 text-sm"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#C1B49A]" />
          <span>Powered by Asia Miles & Vera AI</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#C1B49A]" />
        </motion.div>
      </div>
    </motion.div>
      )}
    </AnimatePresence>
  );
}
