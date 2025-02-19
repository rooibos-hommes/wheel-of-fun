import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Input } from "./components/ui/button";

const emojiMapping = {
  "swimming": "🏊",
  "skateboarding": "🛹",
  "meditation": "🧘",
  "gym": "🏋️",
  "italian": "🍝",
  "music": "🎵",
  "study": "📚",
  "project": "🛠️",
};

const getEmoji = (hobby) => {
  return emojiMapping[hobby.toLowerCase()] || "❓";
};

export default function WheelOfFun() {
  const [hobbies, setHobbies] = useState([]);
  const [input, setInput] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedHobby, setSelectedHobby] = useState("");

  const handleAddHobby = () => {
    if (input.trim() && hobbies.length < 8) {
      setHobbies([...hobbies, { name: input, emoji: getEmoji(input) }]);
      setInput("");
    }
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

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">🎡 The Wheel of Fun 🎡</h1>
      <div className="flex gap-2 mb-4">
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter a hobby..." />
        <Button onClick={handleAddHobby} disabled={hobbies.length >= 8}>Add Hobby</Button>
      </div>
      <div className="relative w-64 h-64 mb-4">
        <motion.div
          className="w-full h-full rounded-full border-4 border-gray-500 flex justify-center items-center"
          animate={{ rotate: rotation }}
          transition={{ duration: 3, ease: "easeOut" }}
        >
          <div className="absolute w-full h-full flex flex-col justify-center items-center">
            {hobbies.length > 0 ? hobbies.map((h, i) => (
              <div
                key={i}
                style={{ transform: `rotate(${(i * 360) / hobbies.length}deg) translateY(-100px)` }}
                className="absolute"
              >
                {h.emoji} {h.name}
              </div>
            )) : <p>Add hobbies to start!</p>}
          </div>
        </motion.div>
      </div>
      <Button onClick={handleSpin} disabled={spinning || hobbies.length < 2}>Spin</Button>
      {selectedHobby && <p className="mt-4 text-xl">🎉 You landed on: {selectedHobby.emoji} {selectedHobby.name}!</p>}
    </div>
  );
}
