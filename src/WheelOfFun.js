import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Input } from "./components/ui/button";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";

const getEmoji = async (hobby, setShowEmojiPicker, setSelectedEmoji, setCurrentHobby) => {
  try {
    const response = await axios.get(`https://emoji-api.com/emojis?search=${hobby}&access_key=insert_api_key`);
    if (response.data.length > 0) {
      return response.data[0].character;
    } else {
      setCurrentHobby(hobby);
      setShowEmojiPicker(true);
      return "❓";
    }
  } catch (error) {
    console.error("Error fetching emoji:", error);
    setCurrentHobby(hobby);
    setShowEmojiPicker(true);
    return "❓";
  }
};

export default function WheelOfFun() {
  const [hobbies, setHobbies] = useState([]);
  const [input, setInput] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedHobby, setSelectedHobby] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("❓");
  const [currentHobby, setCurrentHobby] = useState("");
  const [overrideEmoji, setOverrideEmoji] = useState(false);

  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#FF8C33", "#33FFF5", "#F5FF33", "#A833FF"];

  const handleAddHobby = async (e) => {
    e.preventDefault();
    if (input.trim() && hobbies.length < 8) {
      const emoji = await getEmoji(input, setShowEmojiPicker, setSelectedEmoji, setCurrentHobby);
      setHobbies([...hobbies, { name: input, emoji }]);
      setInput("");
    }
  };

  const handleSelectEmoji = (emojiObject) => {
    setSelectedEmoji(emojiObject.emoji);
    setShowEmojiPicker(false);
    if (overrideEmoji && hobbies.length > 0) {
      const updatedHobbies = [...hobbies];
      updatedHobbies[hobbies.length - 1].emoji = emojiObject.emoji;
      setHobbies(updatedHobbies);
      setOverrideEmoji(false);
    }
  };

  const handleOverrideEmoji = () => {
    setOverrideEmoji(true);
    setShowEmojiPicker(true);
  };

  const handleSpin = () => {
    if (hobbies.length < 2) return;
    setSpinning(true);
    const newRotation = 1440 + Math.floor(Math.random() * 360);
    setRotation(newRotation);

    setTimeout(() => {
      const selectedIndex = Math.floor(((newRotation % 360) / 360) * hobbies.length);
      setSelectedHobby(hobbies[selectedIndex]);
      setSpinning(false);
    }, 4000);
  };

  const handleSaveSettings = () => {
    const blob = new Blob([JSON.stringify(hobbies)], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "hobbies.txt";
    link.click();
  };

  const handleLoadSettings = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const loadedHobbies = JSON.parse(e.target.result);
        setHobbies(loadedHobbies);
      } catch (error) {
        console.error("Error loading hobbies:", error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 text-center min-h-screen w-full bg-black text-white font-[Korinna]">
      <h1 className="text-3xl font-bold mb-4">🎡 The Wheel of Fun 🎡</h1>
      <form onSubmit={handleAddHobby} className="flex flex-col gap-2 mb-4 w-full max-w-xs">
        <Input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Enter a hobby..." 
          className="text-lg p-2"
        />
        <Button type="submit" className="text-lg">Add Hobby</Button>
      </form>
      {showEmojiPicker && (
        <div className="absolute bg-gray-700 p-4 rounded-lg">
          <EmojiPicker onEmojiClick={handleSelectEmoji} />
        </div>
      )}
      <Button onClick={handleOverrideEmoji} className="text-lg mb-4">Override Emoji</Button>
      <div className="flex flex-col items-center gap-4 mb-4">
        <Button onClick={handleSpin} disabled={spinning || hobbies.length < 2} className="text-lg">Spin</Button>
        {selectedHobby && <p className="text-2xl font-bold">🎉 {selectedHobby.emoji} {selectedHobby.name}!</p>}
      </div>
      <div className="flex flex-col items-center gap-4 mb-4">
        <Button onClick={handleSaveSettings} className="text-lg">Save Settings</Button>
        <input type="file" accept=".txt" onChange={handleLoadSettings} className="text-lg" />
      </div>
      <div className="relative w-40 h-40 mb-4">
        <motion.svg
          width="100%" height="100%" viewBox="0 0 200 200"
          animate={{ rotate: rotation }}
          transition={{ duration: 3, ease: "easeOut" }}
        >
          {hobbies.map((h, i) => {
            const angle = (i * 360) / hobbies.length;
            const textAngle = angle + (360 / hobbies.length) / 2 + 25;
            return (
              <g key={i}>
                <path
                  d={`M100,100 L${100 + 100 * Math.cos((angle * Math.PI) / 180)},${100 + 100 * Math.sin((angle * Math.PI) / 180)} A100,100 0 0,1 ${100 + 100 * Math.cos(((angle + 360 / hobbies.length) * Math.PI) / 180)},${100 + 100 * Math.sin(((angle + 360 / hobbies.length) * Math.PI) / 180)} Z`}
                  fill={colors[i % colors.length]}
                  stroke="black"
                />
                <text
                  x="100"
                  y="100"
                  transform={`rotate(${textAngle} 100 100) translate(30 -50)`}
                  textAnchor="middle"
                  fontSize="12"
                  fill="white"
                  fontWeight="bold"
                >
                  {h.emoji} {h.name}
                </text>
              </g>
            );
          })}
        </motion.svg>
      </div>
    </div>
  );
}
