import { motion } from "framer-motion"
import { Home, ArrowLeft, Shield, AlertTriangle } from "lucide-react"
import { useNavigate } from "react-router-dom"

function PageNotFound() {
  const navigate = useNavigate()

  // Floating animation variants
  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-xl"
        />
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-20 right-20 w-40 h-40 bg-purple-200 rounded-full opacity-20 blur-xl"
          style={{ animationDelay: "1s" }}
        />
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          className="absolute top-1/2 left-10 w-24 h-24 bg-green-200 rounded-full opacity-20 blur-xl"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Brand Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <motion.div 
              variants={pulseVariants}
              animate="animate"
              className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg mr-4"
            >
              <Shield className="text-white" size={32} />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900">HRM System</h1>
          </div>
        </motion.div>

        {/* 404 Text with Animation */}
        <motion.div
          initial={{ opacity: 0, y: -50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 mb-4 leading-none">
            404
          </div>
          <motion.div 
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(59, 130, 246, 0.3)",
                "0 0 40px rgba(147, 51, 234, 0.4)",
                "0 0 20px rgba(59, 130, 246, 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
          />
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h1>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-amber-500 mr-2" />
              <span className="text-amber-700 font-medium">Access Restricted</span>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              The page you are looking for might have been removed, had its name changed,
              or is temporarily unavailable. This could be due to security restrictions
              or the content being moved to a different location.
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 min-w-[160px] justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </motion.button>

          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 min-w-[160px] justify-center"
          >
            <Home className="w-5 h-5" />
            Go Home
          </motion.button>
        </motion.div>

        {/* Additional Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-sm text-gray-500"
        >
          <p>Need help? Contact your system administrator or try accessing the main dashboard.</p>
        </motion.div>
      </div>
    </div>
  )
}

export default PageNotFound 