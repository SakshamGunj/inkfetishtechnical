import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, CheckCircle, Users, ArrowRight, Star, Trophy, AlertCircle } from "lucide-react";
import { registerUser, type RegistrationData } from "@/services/registrationService";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationModal = ({ isOpen, onClose }: RegistrationModalProps) => {
  const [step, setStep] = useState<'registration' | 'thankyou' | 'error'>('registration');
  const [formData, setFormData] = useState({
    name: '',
    instagram: '',
    whatsapp: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [registrationId, setRegistrationId] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Prepare registration data
      const registrationData: RegistrationData = {
        name: formData.name,
        instagram: formData.instagram,
        whatsapp: formData.whatsapp,
        tier: "Silver", // Default tier for new registrations
        status: "registered",
        paymentStatus: "pending"
      };

      // Register user using Firebase
      const result = await registerUser(registrationData);

      if (result.success) {
        setRegistrationId(result.registrationId || '');
        setStep('thankyou');
      } else {
        setErrorMessage(result.message);
        setStep('error');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage('Registration failed. Please check your internet connection and try again.');
      setStep('error');
    }
    
    setIsSubmitting(false);
  };

  const handleClose = () => {
    setStep('registration');
    setFormData({ name: '', instagram: '', whatsapp: '' });
    setErrorMessage('');
    setRegistrationId('');
    onClose();
  };

  const joinWhatsAppGroup = () => {
    // Authorverse Summit WhatsApp group link
    window.open('https://chat.whatsapp.com/L3SZXdN8ywbE5AryEMS1ji?mode=r_t', '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] sm:max-w-md mx-auto max-h-[95vh] overflow-y-auto p-4 sm:p-6 rounded-xl">
        {step === 'registration' ? (
          <>
            <DialogHeader className="text-center mb-4">
              <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                🎯 Secure Your Spot Now!
              </DialogTitle>
            </DialogHeader>
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Benefits highlight */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-3 mb-4">
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-gray-800">₹1,25,000 Prizes</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Star className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-gray-800">Publication Guarantee</span>
                </div>
              </div>
            </div>

            {/* Price display */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 bg-red-100 border border-red-200 rounded-lg px-3 py-1.5 mb-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span className="text-red-600 font-medium text-xs sm:text-sm">Limited Time: ₹249 Only!</span>
              </div>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-lg text-gray-500 line-through">₹999</span>
                <span className="text-3xl font-bold text-purple-600">₹249</span>
              </div>
              <p className="text-xs text-green-600 font-semibold">Save ₹750 (75% OFF)</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  className="mt-1 h-11 text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                />
              </div>

              <div>
                <Label htmlFor="instagram" className="text-sm font-medium text-gray-700">
                  Instagram ID *
                </Label>
                <Input
                  id="instagram"
                  type="text"
                  placeholder="@your_instagram_handle"
                  value={formData.instagram}
                  onChange={(e) => handleInputChange('instagram', e.target.value)}
                  required
                  className="mt-1 h-11 text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                />
              </div>

              <div>
                <Label htmlFor="whatsapp" className="text-sm font-medium text-gray-700">
                  WhatsApp Number *
                </Label>
                <Input
                  id="whatsapp"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData.whatsapp}
                  onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                  required
                  className="mt-1 h-11 text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 text-base font-bold rounded-lg shadow-lg mt-4"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-base">Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-base">Register Now - ₹249</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>

              <div className="text-xs text-gray-500 text-center space-y-1 pt-2">
                <div>🔒 256-bit SSL Secure Registration</div>
                <div>✅ Instant Confirmation via WhatsApp</div>
                <div>💯 30-Day Money-back Guarantee</div>
              </div>
            </form>
          </>
        ) : step === 'thankyou' ? (
          <>
            <DialogHeader className="text-center">
            </DialogHeader>
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-tight">
                🎉 Registration Successful!
              </h2>

              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 my-4">
                <h3 className="font-bold text-gray-800 mb-2 text-base">Welcome to Authorverse Summit!</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-center">Registration confirmed for <strong>{formData.name}</strong></span>
                  </div>
                  {registrationId && (
                    <div className="bg-gray-100 rounded p-2 text-xs text-gray-600">
                      Registration ID: <span className="font-mono">{registrationId}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={joinWhatsAppGroup}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-base font-bold rounded-lg shadow-lg"
                >
                  <Users className="w-5 h-5 mr-2" />
                  <span>Join WhatsApp Group</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-100 py-3 text-base"
                >
                  Continue Exploring
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogHeader className="text-center">
            </DialogHeader>
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center py-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-tight">
                Oops! Something went wrong.
              </h2>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4 text-sm text-red-700">
                <p>{errorMessage}</p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => setStep('registration')}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 text-base font-bold rounded-lg shadow-lg"
                >
                  <span>Try Again</span>
                </Button>

                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-100 py-3 text-base"
                >
                  Close
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationModal; 
