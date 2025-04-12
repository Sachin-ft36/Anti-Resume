import { useState, useRef, useEffect } from "react";
import { 
  Video, 
  VideoOff,
  Mic,
  MicOff,
  Users,
  MessageSquare,
  Phone,
  Share2,
  Link as LinkIcon,
  Circle,
  PauseCircle,
  Copy,
  Layout,
  Settings,
  MoreVertical
} from "lucide-react";

const participants = [
  { id: 1, name: "Emma Wilson", role: "Candidate", avatar: "EW", isActive: true },
  { id: 2, name: "Alex Johnson", role: "Interviewer", avatar: "AJ", isActive: true },
];

const initialMessages = [
  { id: 1, sender: "Alex Johnson", text: "Hello Emma, welcome to the interview!", time: "10:02 AM" },
  { id: 2, sender: "Emma Wilson", text: "Thank you! I'm excited to be here.", time: "10:03 AM" },
  { id: 3, sender: "Alex Johnson", text: "Let's start by discussing your recent project.", time: "10:04 AM" },
];

const LiveInterview = () => {
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [activeTab, setActiveTab] = useState("participants");
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [stream, setStream] = useState(null);
  const [localVideoUrl, setLocalVideoUrl] = useState("");
  const chatContainerRef = useRef(null);
  const videoRef = useRef(null);
  const recordingTimerRef = useRef(null);
  
  // Request camera and microphone permissions
  const requestMediaPermissions = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setVideoEnabled(true);
      setAudioEnabled(true);
    } catch (err) {
      console.error("Error accessing media devices:", err);
      alert("Could not access camera or microphone. Please check permissions.");
    }
  };

  useEffect(() => {
    requestMediaPermissions();
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isRecording) {
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    }
    
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, [isRecording]);

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setAudioEnabled(audioTrack.enabled);
      }
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setRecordingTime(0);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://skillsphere.com/interview/xyz123");
    alert("Meeting link copied to clipboard!");
  };

  const handleEndCall = () => {
    if (isRecording) {
      setIsRecording(false);
    }
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    alert("Call ended");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: "Alex Johnson",
        text: newMessage.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  return (
    <div className="max-w-full h-[calc(100vh-100px)] flex flex-col">
      <div className="bg-gray-900 text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-lg font-semibold">Frontend Developer Interview</h1>
          {isRecording && (
            <div className="flex items-center space-x-2">
              <span className="animate-pulse">●</span>
              <span>{formatTime(recordingTime)}</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setShowShareDialog(true)}
            className="text-white hover:bg-gray-800 p-2 rounded"
          >
            <Share2 className="h-4 w-4 mr-2 inline" />
            Share
          </button>
          
          <button className="text-white hover:bg-gray-800 p-2 rounded">
            <Layout className="h-4 w-4 mr-2 inline" />
            Layout
          </button>
          <button className="text-white hover:bg-gray-800 p-2 rounded">
            <Settings className="h-4 w-4 mr-2 inline" />
            Settings
          </button>
          <button className="text-white hover:bg-gray-800 p-2 rounded">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-100">
        <div className="md:col-span-3 flex flex-col gap-4">
          <div className="relative rounded-lg overflow-hidden bg-gray-900 h-[70%]">
            <div className="absolute inset-0 flex items-center justify-center">
              {videoEnabled ? (
                <video 
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <div className="text-center">
                    <div className="h-20 w-20 rounded-full bg-gray-700 flex items-center justify-center text-white mx-auto mb-2">
                      <span className="text-2xl">AJ</span>
                    </div>
                    <p className="text-gray-300">Alex Johnson</p>
                    <p className="text-gray-500 text-sm">Camera is off</p>
                  </div>
                </div>
              )}
              <div className="absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 rounded text-sm">
                Alex Johnson (Interviewer)
              </div>
              {isRecording && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm flex items-center">
                  <span className="animate-pulse mr-1">●</span> REC
                </div>
              )}
            </div>
          </div>
          
          <div className="relative rounded-lg overflow-hidden bg-gray-800 h-[30%]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-gray-700 flex items-center justify-center text-white mx-auto mb-2">
                    <span className="text-xl">EW</span>
                  </div>
                  <p className="text-gray-300">Emma Wilson</p>
                  <p className="text-gray-500 text-sm">Candidate</p>
                </div>
              </div>
              <div className="absolute top-2 left-2 bg-gray-700 text-white px-2 py-1 rounded text-sm">
                Emma Wilson (Candidate)
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-1 bg-white rounded-lg shadow-sm flex flex-col">
          <div className="flex border-b">
            <button 
              onClick={() => setActiveTab("participants")}
              className={`flex-1 py-2 text-sm font-medium flex items-center justify-center ${activeTab === "participants" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
            >
              <Users className="h-4 w-4 mr-2" />
              Participants
            </button>
            <button 
              onClick={() => setActiveTab("chat")}
              className={`flex-1 py-2 text-sm font-medium flex items-center justify-center ${activeTab === "chat" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </button>
          </div>
          
          {activeTab === "participants" && (
            <div className="flex-grow p-4 overflow-y-auto">
              <div className="space-y-4">
                {participants.map(participant => (
                  <div key={participant.id} className="flex items-center justify-between p-2 border-b">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium mr-3">
                        {participant.avatar}
                      </div>
                      <div>
                        <p className="font-medium">{participant.name}</p>
                        <p className="text-xs text-gray-500">{participant.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {participant.isActive ? (
                        <span className="bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded text-xs">
                          Active
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-500 border border-gray-200 px-2 py-1 rounded text-xs">
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === "chat" && (
            <div className="flex-grow flex flex-col">
              <div 
                ref={chatContainerRef}
                className="flex-grow overflow-y-auto p-4 space-y-4"
                style={{ maxHeight: 'calc(100% - 60px)' }}
              >
                {messages.map(message => (
                  <div key={message.id} className="flex flex-col">
                    <div className="flex items-center mb-1">
                      <span className="font-medium text-sm">{message.sender}</span>
                      <span className="text-xs text-gray-500 ml-2">{message.time}</span>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-2 text-sm">
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
              
              <form 
                onSubmit={handleSendMessage} 
                className="border-t p-2 flex items-center"
              >
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-grow border rounded-md px-3 py-2 text-sm"
                />
                <button 
                  type="submit" 
                  className="ml-2 bg-blue-500 text-white px-3 py-2 rounded text-sm"
                >
                  Send
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-900 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 mr-4">
              <span className="text-sm text-gray-400">Camera:</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={videoEnabled} 
                  onChange={toggleVideo}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Mic:</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={audioEnabled} 
                  onChange={toggleAudio}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleVideo}
              className={`rounded-full h-10 w-10 p-0 flex items-center justify-center ${videoEnabled ? 'bg-white text-gray-800' : 'bg-gray-700 text-white'}`}
            >
              {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </button>
            
            <button
              onClick={toggleAudio}
              className={`rounded-full h-10 w-10 p-0 flex items-center justify-center ${audioEnabled ? 'bg-white text-gray-800' : 'bg-gray-700 text-white'}`}
            >
              {audioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </button>
            
            <button
              onClick={toggleRecording}
              className={`rounded-full h-10 w-10 p-0 flex items-center justify-center ${isRecording ? 'bg-red-500 text-white' : 'bg-white text-gray-800'}`}
            >
              {isRecording ? <PauseCircle className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
            </button>
            
            <button
              onClick={() => setShowShareDialog(true)}
              className="rounded-full h-10 w-10 p-0 flex items-center justify-center bg-white text-gray-800"
            >
              <LinkIcon className="h-5 w-5" />
            </button>
            
            <button
              onClick={handleEndCall}
              className="rounded-full h-10 w-10 p-0 flex items-center justify-center bg-red-500 text-white"
            >
              <Phone className="h-5 w-5 rotate-135" />
            </button>
          </div>

          <div className="hidden sm:block text-sm text-gray-400">
            {isRecording && (
              <div className="flex items-center">
                <span className="inline-block h-2 w-2 bg-red-500 rounded-full animate-pulse mr-2"></span>
                Recording: {formatTime(recordingTime)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Share Dialog */}
      {showShareDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-2">Share Interview Link</h3>
            <p className="text-gray-600 mb-4">
              Copy this link to invite others to join the interview
            </p>
            <div className="flex items-center space-x-2 mt-4">
              <div className="border rounded-md px-3 py-2 flex-1 bg-gray-50 overflow-x-auto">
                <code className="text-sm">https://skillsphere.com/interview/xyz123</code>
              </div>
              <button 
                onClick={handleCopyLink}
                className="bg-blue-500 text-white py-1 px-3 rounded text-sm flex items-center"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </button>
            </div>
            <div className="mt-4 flex justify-end">
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowShareDialog(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveInterview;