db.config.update({_id: 'account'}, {
  $set: {
    "_id": "account",
    "username": "bigdefense",
    "password": "inigma"
  }
}, {upsert: true});

db.playbook.drop();
db.playbook.insert({_id: -1, "name": "QB Kneel", "formation": "Special", "type": "Other"});
db.playbook.insert({_id: 1, "name": "HB Blast Weak", "formation": "I Form", "type": "Run_Inside"});
db.playbook.insert({_id: 14, "name": "I Pitch Weak", "formation": "I Form", "type": "Run_Outside"});
db.playbook.insert({_id: 16, "name": "Quick In", "formation": "Shotgun 3WR", "type": "Pass_Short"});
db.playbook.insert({_id: 17, "name": "TE Drag", "formation": "Shotgun 3WR", "type": "Pass_Short"});
db.playbook.insert({_id: 18, "name": "Short Hooks", "formation": "Singleback Big", "type": "Pass_Short"});
db.playbook.insert({_id: 19, "name": "Flares", "formation": "I Form", "type": "Pass_Deep"});
db.playbook.insert({_id: 21, "name": "TE Quick Hit", "formation": "I Form", "type": "Pass_Medium"});
db.playbook.insert({_id: 22, "name": "Quick Hooks", "formation": "Strong I", "type": "Pass_Short"});
db.playbook.insert({_id: 23, "name": "FL Hitch", "formation": "I Form", "type": "Pass_Short"});
db.playbook.insert({_id: 24, "name": "Curls", "formation": "Pro Set", "type": "Pass_Short"});
db.playbook.insert({_id: 33, "name": "Corner Threat", "formation": "Shotgun 3WR", "type": "Pass_Medium"});
db.playbook.insert({_id: 34, "name": "Double Slant", "formation": "Shotgun 3WR", "type": "Pass_Deep"});
db.playbook.insert({_id: 35, "name": "WR Post Corner", "formation": "Shotgun 5WR", "type": "Pass_Deep"});
db.playbook.insert({_id: 42, "name": "HB Pitch", "formation": "Singleback", "type": "Run_Outside"});
db.playbook.insert({_id: 43, "name": "HB Slam", "formation": "I Form", "type": "Run_Inside"});
db.playbook.insert({_id: 44, "name": "FB Belly", "formation": "Pro Set", "type": "Run_Tackle"});
db.playbook.insert({_id: 47, "name": "FB Dive", "formation": "I Form", "type": "Run_Inside"});
db.playbook.insert({_id: 48, "name": "FB Slam Strong", "formation": "I Form", "type": "Run_Inside"});
db.playbook.insert({_id: 49, "name": "QB Draw", "formation": "Shotgun 3WR", "type": "Run_Inside"});
db.playbook.insert({_id: 50, "name": "Power Toss", "formation": "Weak I", "type": "Run_Outside"});
db.playbook.insert({_id: 51, "name": "HB Sweep Strong", "formation": "I Form", "type": "Run_Outside"});
db.playbook.insert({_id: 52, "name": "HB Off Tackle", "formation": "Strong I", "type": "Run_Tackle"});
db.playbook.insert({_id: 53, "name": "HB Fly", "formation": "Shotgun 3WR", "type": "Pass_Medium"});
db.playbook.insert({_id: 54, "name": "Deep Corner", "formation": "Shotgun 3WR", "type": "Pass_Deep"});
db.playbook.insert({_id: 65, "name": "Slot In N Up", "formation": "Shotgun 3WR", "type": "Pass_Medium"});
db.playbook.insert({_id: 66, "name": "Post Corner", "formation": "Pro Set", "type": "Pass_Medium"});
db.playbook.insert({_id: 67, "name": "Cross Up", "formation": "Singleback", "type": "Pass_Deep"});
db.playbook.insert({_id: 68, "name": "Curls Left", "formation": "Singleback", "type": "Pass_Medium"});
db.playbook.insert({_id: 69, "name": "TE Slant", "formation": "I Form", "type": "Pass_Deep"});
db.playbook.insert({_id: 70, "name": "Pump N Go", "formation": "I Form", "type": "Pass_Medium"});
db.playbook.insert({_id: 71, "name": "TE Out", "formation": "Strong I", "type": "Pass_Medium"});
db.playbook.insert({_id: 72, "name": "In N Out", "formation": "Shotgun 3WR", "type": "Pass_Medium"});
db.playbook.insert({_id: 73, "name": "Hook Outs", "formation": "I Form", "type": "Pass_Short"});
db.playbook.insert({_id: 74, "name": "Overload", "formation": "Singleback", "type": "Pass_Deep"});
db.playbook.insert({_id: 75, "name": "HB Flat", "formation": "Shotgun 3WR", "type": "Pass_Deep"});
db.playbook.insert({_id: 76, "name": "FB Dive", "formation": "Goal Line", "type": "Run_Inside"});
db.playbook.insert({_id: 77, "name": "HB Off Tackle", "formation": "Goal Line", "type": "Run_Tackle"});
db.playbook.insert({_id: 78, "name": "HB Sting", "formation": "Goal Line", "type": "Run_Inside"});
db.playbook.insert({_id: 82, "name": "Weak I WR Drag", "formation": "Weak I", "type": "Pass_Short"});
db.playbook.insert({_id: 83, "name": "Weak I HB Slam", "formation": "Weak I", "type": "Run_Tackle"});
db.playbook.insert({_id: 84, "name": "FB Cross Screen", "formation": "Weak I", "type": "Pass_Screen"});
db.playbook.insert({_id: 85, "name": "HB Draw", "formation": "Shotgun 3WR", "type": "Run_Inside"});
db.playbook.insert({_id: 86, "name": "HB Handoff", "formation": "Shotgun 3WR", "type": "Run_Tackle"});
db.playbook.insert({_id: 87, "name": "Cross Up", "formation": "Strong I", "type": "Pass_Medium"});
db.playbook.insert({_id: 88, "name": "5 Wide Streaks", "formation": "Shotgun 5WR", "type": "Pass_Deep"});
db.playbook.insert({_id: 89, "name": "TE Sideline", "formation": "Weak I", "type": "Pass_Short"});
db.playbook.insert({_id: 90, "name": "QB Sneak Left", "formation": "I Form", "type": "Run_Inside"});
db.playbook.insert({_id: 91, "name": "QB Sneak Right", "formation": "I Form", "type": "Run_Inside"});
db.playbook.insert({_id: 92, "name": "Off Tackle", "formation": "I Form", "type": "Run_Tackle"});
db.playbook.insert({_id: 93, "name": "Weak Side Handoff", "formation": "I Form", "type": "Run_Tackle"});
db.playbook.insert({_id: 94, "name": "FB Outside", "formation": "I Form", "type": "Run_Outside"});
db.playbook.insert({_id: 95, "name": "FB Outside Weak", "formation": "I Form", "type": "Run_Outside"});
db.playbook.insert({_id: 96, "name": "QB Rollout Rush", "formation": "I Form", "type": "Run_Outside"});
db.playbook.insert({_id: 97, "name": "QB Rollout Weak", "formation": "I Form", "type": "Run_Outside"});
db.playbook.insert({_id: 98, "name": "FB Pitch Sweep", "formation": "I Form", "type": "Run_Outside"});
db.playbook.insert({_id: 99, "name": "FB Pitch Weak", "formation": "I Form", "type": "Run_Outside"});
db.playbook.insert({_id: 100, "name": "HB Screen Right", "formation": "I Form", "type": "Pass_Screen"});
db.playbook.insert({_id: 101, "name": "Double Wheel", "formation": "I Form", "type": "Pass_Medium"});
db.playbook.insert({_id: 102, "name": "FB Out", "formation": "I Form", "type": "Pass_Medium"});
db.playbook.insert({_id: 103, "name": "Deep Posts", "formation": "I Form", "type": "Pass_Deep"});
db.playbook.insert({_id: 104, "name": "TE Deep Curl", "formation": "I Form", "type": "Pass_Deep"});
db.playbook.insert({_id: 105, "name": "HB Streak", "formation": "I Form", "type": "Pass_Deep"});
db.playbook.insert({_id: 106, "name": "FB Streak", "formation": "I Form", "type": "Pass_Deep"});
db.playbook.insert({_id: 107, "name": "HB Dive Weak", "formation": "Strong I", "type": "Run_Inside"});
db.playbook.insert({_id: 108, "name": "HB Slam", "formation": "Strong I", "type": "Run_Inside"});
db.playbook.insert({_id: 109, "name": "FB Weakside Slam", "formation": "Strong I", "type": "Run_Tackle"});
db.playbook.insert({_id: 110, "name": "FB Slam", "formation": "Strong I", "type": "Run_Inside"});
db.playbook.insert({_id: 111, "name": "QB Draw Left", "formation": "Strong I", "type": "Run_Inside"});
db.playbook.insert({_id: 112, "name": "QB Draw Right", "formation": "Strong I", "type": "Run_Inside"});
db.playbook.insert({_id: 113, "name": "HB Outside Weak", "formation": "Strong I", "type": "Run_Tackle"});
db.playbook.insert({_id: 114, "name": "FB Weak Across", "formation": "Strong I", "type": "Run_Outside"});
db.playbook.insert({_id: 115, "name": "FB Off Tackle", "formation": "Strong I", "type": "Run_Tackle"});
db.playbook.insert({_id: 116, "name": "QB Rollout Rush", "formation": "Strong I", "type": "Run_Outside"});
db.playbook.insert({_id: 117, "name": "QB Rollout Weak", "formation": "Strong I", "type": "Run_Outside"});
db.playbook.insert({_id: 118, "name": "Pitch Weak", "formation": "Strong I", "type": "Run_Outside"});
db.playbook.insert({_id: 119, "name": "HB Sweep Strong", "formation": "Strong I", "type": "Run_Outside"});
db.playbook.insert({_id: 122, "name": "TE Short Out", "formation": "Strong I", "type": "Pass_Short"});
db.playbook.insert({_id: 123, "name": "HB Screen Right", "formation": "Strong I", "type": "Pass_Screen"});
db.playbook.insert({_id: 124, "name": "FB Flare", "formation": "Strong I", "type": "Pass_Short"});
db.playbook.insert({_id: 125, "name": "Strong Flood", "formation": "Shotgun 3WR", "type": "Pass_Short"});
db.playbook.insert({_id: 128, "name": "Z Spot", "formation": "Singleback", "type": "Pass_Short"});
db.playbook.insert({_id: 129, "name": "Flanker Drag", "formation": "Singleback", "type": "Pass_Deep"});
db.playbook.insert({_id: 130, "name": "TE Post", "formation": "Singleback", "type": "Pass_Medium"});
db.playbook.insert({_id: 131, "name": "TE Shallow Cross", "formation": "Singleback", "type": "Pass_Medium"});
db.playbook.insert({_id: 132, "name": "HB Screen", "formation": "Singleback", "type": "Pass_Screen"});
db.playbook.insert({_id: 133, "name": "HB Wheel", "formation": "Singleback", "type": "Pass_Medium"});
db.playbook.insert({_id: 134, "name": "WR Screen", "formation": "Singleback", "type": "Pass_Screen"});
db.playbook.insert({_id: 135, "name": "HB Slam", "formation": "Singleback", "type": "Run_Inside"});
db.playbook.insert({_id: 136, "name": "HB Slam Weak", "formation": "Singleback", "type": "Run_Tackle"});
db.playbook.insert({_id: 137, "name": "Weakside Handoff", "formation": "Singleback", "type": "Run_Tackle"});
db.playbook.insert({_id: 138, "name": "HB Outside Handoff", "formation": "Singleback", "type": "Run_Tackle"});
db.playbook.insert({_id: 139, "name": "QB Rollout Rush Strong", "formation": "Singleback", "type": "Run_Outside"});
db.playbook.insert({_id: 140, "name": "QB Rollout Rush Weak", "formation": "Singleback", "type": "Run_Outside"});
db.playbook.insert({_id: 141, "name": "TE Drive", "formation": "Singleback", "type": "Pass_Deep"});
db.playbook.insert({_id: 142, "name": "HB Pitch Strong", "formation": "Singleback", "type": "Run_Outside"});
db.playbook.insert({_id: 143, "name": "Quick Slants", "formation": "Shotgun 5WR", "type": "Pass_Short"});
db.playbook.insert({_id: 144, "name": "QB Draw", "formation": "Shotgun 5WR", "type": "Run_Inside"});
db.playbook.insert({_id: 145, "name": "QB Rollout Rush Strong", "formation": "Shotgun 5WR", "type": "Run_Outside"});
db.playbook.insert({_id: 146, "name": "QB Rollout Rush Weak", "formation": "Shotgun 5WR", "type": "Run_Outside"});
db.playbook.insert({_id: 147, "name": "WR In", "formation": "Shotgun 5WR", "type": "Pass_Short"});
db.playbook.insert({_id: 148, "name": "HB Out", "formation": "Pro Set", "type": "Pass_Short"});
db.playbook.insert({_id: 149, "name": "FB Texas", "formation": "Pro Set", "type": "Pass_Medium"});
db.playbook.insert({_id: 150, "name": "SS Pressure", "formation": "Pro Set", "type": "Pass_Short"});
db.playbook.insert({_id: 151, "name": "HB Off Tackle", "formation": "Pro Set", "type": "Run_Tackle"});
db.playbook.insert({_id: 152, "name": "HB Blast", "formation": "Pro Set", "type": "Run_Inside"});
db.playbook.insert({_id: 153, "name": "HB Sweep", "formation": "Pro Set", "type": "Run_Outside"});
db.playbook.insert({_id: 154, "name": "FB Sweep Weak", "formation": "Pro Set", "type": "Run_Outside"});
db.playbook.insert({_id: 155, "name": "TE Sail", "formation": "Pro Set", "type": "Pass_Deep"});
db.playbook.insert({_id: 156, "name": "WR In", "formation": "Weak I", "type": "Pass_Short"});
db.playbook.insert({_id: 157, "name": "Streaks", "formation": "Weak I", "type": "Pass_Deep"});
db.playbook.insert({_id: 158, "name": "FB Streak", "formation": "Weak I", "type": "Pass_Deep"});
db.playbook.insert({_id: 159, "name": "FB Streak", "formation": "Strong I", "type": "Pass_Deep"});
db.playbook.insert({_id: 160, "name": "TE Drive", "formation": "Shotgun 3WR", "type": "Pass_Deep"});
db.playbook.insert({_id: 163, "name": "WR Skinny Post", "formation": "Strong I", "type": "Pass_Medium"});
db.playbook.insert({_id: 164, "name": "HB Off Tackle Weak", "formation": "Weak I", "type": "Run_Tackle"});
db.playbook.insert({_id: 165, "name": "HB Dive Strong", "formation": "Weak I", "type": "Run_Inside"});
db.playbook.insert({_id: 166, "name": "HB Sweep Weak", "formation": "Weak I", "type": "Run_Outside"});
db.playbook.insert({_id: 167, "name": "HB Screen", "formation": "Shotgun 3WR", "type": "Pass_Screen"});
db.playbook.insert({_id: 168, "name": "HB Screen Strong", "formation": "Pro Set", "type": "Pass_Screen"});
db.playbook.insert({_id: 169, "name": "TE Drag Short", "formation": "Pro Set", "type": "Pass_Medium"});
db.playbook.insert({_id: 170, "name": "HB Quick Pitch Weak", "formation": "Pro Set", "type": "Run_Outside"});
db.playbook.insert({_id: 171, "name": "HB Dive", "formation": "Shotgun 3WR", "type": "Run_Tackle"});
db.playbook.insert({_id: 172, "name": "Comebacks", "formation": "Shotgun 5WR", "type": "Pass_Short"});
db.playbook.insert({_id: 173, "name": "5 Wide Deep Post", "formation": "Shotgun 5WR", "type": "Pass_Medium"});
db.playbook.insert({_id: 174, "name": "5 WR Hitch Corners", "formation": "Shotgun 5WR", "type": "Pass_Medium"});
db.playbook.insert({_id: 175, "name": "Shallow Cross", "formation": "Shotgun 5WR", "type": "Pass_Medium"});
db.playbook.insert({_id: 176, "name": "Double Fly", "formation": "Pro Set", "type": "Pass_Medium"});
db.playbook.insert({_id: 177, "name": "Pro TE Drag", "formation": "Pro Set", "type": "Pass_Medium"});
db.playbook.insert({_id: 178, "name": "Pro TE Screen", "formation": "Pro Set", "type": "Pass_Screen"});
db.playbook.insert({_id: 179, "name": "Slot Deep Cross", "formation": "Singleback", "type": "Pass_Deep"});
db.playbook.insert({_id: 181, "name": "Single Back Crossup", "formation": "Singleback", "type": "Pass_Medium"});
db.playbook.insert({_id: 182, "name": "HB Under Out", "formation": "Singleback", "type": "Pass_Short"});
db.playbook.insert({_id: 183, "name": "Midfield Cross", "formation": "Singleback", "type": "Pass_Short"});
db.playbook.insert({_id: 184, "name": "Up and Over", "formation": "Singleback", "type": "Pass_Short"});
db.playbook.insert({_id: 185, "name": "Single Back Quick Slant", "formation": "Singleback", "type": "Pass_Short"});
db.playbook.insert({_id: 186, "name": "TE In N Out", "formation": "Singleback", "type": "Pass_Medium"});
db.playbook.insert({_id: 187, "name": "TE Cross Slant", "formation": "Singleback", "type": "Pass_Medium"});
db.playbook.insert({_id: 188, "name": "Reverse Slant", "formation": "Singleback", "type": "Pass_Deep"});
db.playbook.insert({_id: 189, "name": "Quick Cutback", "formation": "Singleback", "type": "Pass_Short"});
db.playbook.insert({_id: 190, "name": "HB Dive", "formation": "Singleback", "type": "Run_Inside"});
db.playbook.insert({_id: 191, "name": "HB Dive Weak", "formation": "Singleback", "type": "Run_Inside"});
db.playbook.insert({_id: 192, "name": "FB Out", "formation": "Strong I", "type": "Pass_Medium"});
db.playbook.insert({_id: 193, "name": "TE Shallow Drag", "formation": "Shotgun 3WR", "type": "Pass_Short"});
db.playbook.insert({_id: 194, "name": "Under Swing", "formation": "Singleback", "type": "Pass_Medium"});
db.playbook.insert({_id: 195, "name": "Flood Right", "formation": "Shotgun 3WR", "type": "Pass_Deep"});
db.playbook.insert({_id: 196, "name": "Shotgun Smash", "formation": "Shotgun 3WR", "type": "Pass_Medium"});
db.playbook.insert({_id: 197, "name": "Double Back Hooks", "formation": "I Form", "type": "Pass_Medium"});
db.playbook.insert({_id: 198, "name": "I Medium Cross", "formation": "I Form", "type": "Pass_Short"});
db.playbook.insert({_id: 199, "name": "HB Streak", "formation": "I Form", "type": "Pass_Short"});
db.playbook.insert({_id: 200, "name": "HB Slam Weak", "formation": "I Form", "type": "Run_Tackle"});
db.playbook.insert({_id: 201, "name": "TE Deep Corner", "formation": "Weak I", "type": "Pass_Medium"});
db.playbook.insert({_id: 202, "name": "TE Medium Drag", "formation": "Weak I", "type": "Pass_Medium"});
db.playbook.insert({_id: 203, "name": "HB Screen Strong", "formation": "Weak I", "type": "Pass_Screen"});
db.playbook.insert({_id: 204, "name": "HB Screen Weak", "formation": "Weak I", "type": "Pass_Screen"});
db.playbook.insert({_id: 207, "name": "FB Strongside Slam", "formation": "Weak I", "type": "Run_Tackle"});
db.playbook.insert({_id: 208, "name": "FB Blast", "formation": "Pro Set", "type": "Run_Inside"});
db.playbook.insert({_id: 209, "name": "HB Slam", "formation": "Pro Set", "type": "Run_Tackle"});
db.playbook.insert({_id: 210, "name": "QB Rollout Strong", "formation": "Weak I", "type": "Run_Outside"});
db.playbook.insert({_id: 211, "name": "QB Rollout Weak", "formation": "Pro Set", "type": "Run_Outside"});
db.playbook.insert({_id: 212, "name": "QB Rollout Strong", "formation": "Pro Set", "type": "Run_Outside"});
db.playbook.insert({_id: 213, "name": "QB Rollout Weak", "formation": "Shotgun 3WR", "type": "Run_Outside"});
db.playbook.insert({_id: 214, "name": "QB Rollout Strong", "formation": "Shotgun 3WR", "type": "Run_Outside"});
db.playbook.insert({_id: 215, "name": "FB Weak Flare", "formation": "Strong I", "type": "Pass_Medium"});
db.playbook.insert({_id: 216, "name": "FB Screen Weak", "formation": "Strong I", "type": "Pass_Screen"});
db.playbook.insert({_id: 217, "name": "WR Clear Out", "formation": "Weak I", "type": "Pass_Short"});
db.playbook.insert({_id: 218, "name": "WR Screen Strong", "formation": "Weak I", "type": "Pass_Screen"});
db.playbook.insert({_id: 219, "name": "FB Off Tackle Strong", "formation": "Weak I", "type": "Run_Tackle"});
db.playbook.insert({_id: 220, "name": "FB Strong Across", "formation": "Weak I", "type": "Run_Outside"});
db.playbook.insert({_id: 221, "name": "FB Slam", "formation": "Pro Set", "type": "Run_Inside"});
db.playbook.insert({_id: 222, "name": "HB Direct Snap", "formation": "Shotgun 3WR", "type": "Run_Inside"});
db.playbook.insert({_id: 223, "name": "HB Pitch Right", "formation": "Shotgun 3WR", "type": "Run_Outside"});
db.playbook.insert({_id: 224, "name": "WR Hook", "formation": "Shotgun 3WR", "type": "Pass_Deep"});
db.playbook.insert({_id: 225, "name": "HB Screen Weak", "formation": "Shotgun 3WR", "type": "Pass_Screen"});
db.playbook.insert({_id: 226, "name": "WR Drag", "formation": "Strong I", "type": "Pass_Medium"});
db.playbook.insert({_id: 227, "name": "FB Under", "formation": "Strong I", "type": "Pass_Deep"});
db.playbook.insert({_id: 228, "name": "WR In", "formation": "Strong I", "type": "Pass_Medium"});
db.playbook.insert({_id: 229, "name": "Weak Overload", "formation": "Strong I", "type": "Pass_Medium"});
db.playbook.insert({_id: 230, "name": "FB Clear", "formation": "Strong I", "type": "Pass_Medium"});
db.playbook.insert({_id: 231, "name": "All Go WR Clear Out", "formation": "Shotgun 3WR", "type": "Pass_Deep"});
db.playbook.insert({_id: 232, "name": "HB Weak Out", "formation": "Shotgun 3WR", "type": "Pass_Short"});
db.playbook.insert({_id: 233, "name": "HB Clear Out", "formation": "Shotgun 3WR", "type": "Pass_Deep"});
db.playbook.insert({_id: 234, "name": "Shotgun Hooks", "formation": "Shotgun 3WR", "type": "Pass_Deep"});
db.playbook.insert({_id: 235, "name": "Middle Overload", "formation": "Singleback", "type": "Pass_Medium"});
db.playbook.insert({_id: 236, "name": "HB Clear", "formation": "Singleback", "type": "Pass_Deep"});
db.playbook.insert({_id: 237, "name": "Quick Routes", "formation": "Singleback", "type": "Pass_Short"});
db.playbook.insert({_id: 238, "name": "Weak Overload", "formation": "Weak I", "type": "Pass_Medium"});
db.playbook.insert({_id: 239, "name": "Strong Overload", "formation": "Weak I", "type": "Pass_Deep"});
db.playbook.insert({_id: 240, "name": "FB Smash", "formation": "Weak I", "type": "Pass_Deep"});
db.playbook.insert({_id: 241, "name": "Double Hitches", "formation": "Weak I", "type": "Pass_Medium"});
db.playbook.insert({_id: 242, "name": "WR Under", "formation": "Weak I", "type": "Pass_Medium"});
db.playbook.insert({_id: 243, "name": "Posts Flags", "formation": "Shotgun 5WR", "type": "Pass_Medium"});
db.playbook.insert({_id: 244, "name": "5 Wide Hooks", "formation": "Shotgun 5WR", "type": "Pass_Short"});
db.playbook.insert({_id: 245, "name": "Underneath Clearout", "formation": "Shotgun 5WR", "type": "Pass_Deep"});
db.playbook.insert({_id: 246, "name": "Quick Outs", "formation": "Shotgun 5WR", "type": "Pass_Short"});
db.playbook.insert({_id: 247, "name": "Middle Cross", "formation": "Shotgun 5WR", "type": "Pass_Deep"});
db.playbook.insert({_id: 248, "name": "Middle Overload", "formation": "Shotgun 5WR", "type": "Pass_Medium"});
db.playbook.insert({_id: 249, "name": "Pro WR Slant", "formation": "Pro Set", "type": "Pass_Medium"});
db.playbook.insert({_id: 250, "name": "Pro Slants", "formation": "Pro Set", "type": "Pass_Deep"});
db.playbook.insert({_id: 251, "name": "Strong Overload", "formation": "Pro Set", "type": "Pass_Deep"});
db.playbook.insert({_id: 252, "name": "HB Streak", "formation": "Pro Set", "type": "Pass_Deep"});
db.playbook.insert({_id: 253, "name": "HB Smash", "formation": "Pro Set", "type": "Pass_Medium"});
db.playbook.insert({_id: 254, "name": "TE Post", "formation": "Pro Set", "type": "Pass_Medium"});
db.playbook.insert({_id: 255, "name": "TE Deep Middle", "formation": "I Form", "type": "Pass_Deep"});
db.playbook.insert({_id: 256, "name": "Midfield Ins", "formation": "I Form", "type": "Pass_Medium"});
db.playbook.insert({_id: 257, "name": "Overload Right", "formation": "I Form", "type": "Pass_Medium"});
db.playbook.insert({_id: 258, "name": "Fullback Flag R", "formation": "I Form", "type": "Pass_Deep"});
db.playbook.insert({_id: 259, "name": "Weak Flag Deep Post", "formation": "I Form", "type": "Pass_Deep"});
db.playbook.insert({_id: 260, "name": "HB Under Streaks", "formation": "I Form", "type": "Pass_Deep"});
db.playbook.insert({_id: 261, "name": "FB Medium Right", "formation": "I Form", "type": "Pass_Deep"});
db.playbook.insert({_id: 262, "name": "FB Short Right", "formation": "I Form", "type": "Pass_Medium"});
db.playbook.insert({_id: 263, "name": "Double Back Out and Up", "formation": "I Form", "type": "Pass_Deep"});
db.playbook.insert({_id: 264, "name": "TE Cross", "formation": "I Form", "type": "Pass_Medium"});
db.playbook.insert({_id: 265, "name": "FB Sweep Strong", "formation": "Strong I", "type": "Run_Outside"});
db.playbook.insert({_id: 266, "name": "HB Counter Weak", "formation": "Strong I", "type": "Run_Counter"});
db.playbook.insert({_id: 267, "name": "QB Slam", "formation": "Strong I", "type": "Run_Tackle"});
db.playbook.insert({_id: 268, "name": "QB Slam", "formation": "Shotgun 3WR", "type": "Run_Tackle"});
db.playbook.insert({_id: 269, "name": "HB Counter Off Tackle", "formation": "Shotgun 3WR", "type": "Run_Counter"});
db.playbook.insert({_id: 270, "name": "QB Off Tackle", "formation": "Singleback", "type": "Run_Tackle"});
db.playbook.insert({_id: 271, "name": "HB Counter Strong", "formation": "Singleback", "type": "Run_Counter"});
db.playbook.insert({_id: 272, "name": "QB Sneak Right", "formation": "Singleback", "type": "Run_Inside"});
db.playbook.insert({_id: 273, "name": "HB Counter Sweep Strong", "formation": "Weak I", "type": "Run_Counter"});
db.playbook.insert({_id: 274, "name": "QB Rollout Weak", "formation": "Weak I", "type": "Run_Outside"});
db.playbook.insert({_id: 275, "name": "FB Slam Weak", "formation": "Weak I", "type": "Run_Inside"});
db.playbook.insert({_id: 276, "name": "HB Slam Strong", "formation": "Weak I", "type": "Run_Inside"});
db.playbook.insert({_id: 277, "name": "QB Slam Strong", "formation": "Shotgun 5WR", "type": "Run_Tackle"});
db.playbook.insert({_id: 278, "name": "QB Slam Weak", "formation": "Shotgun 5WR", "type": "Run_Tackle"});
db.playbook.insert({_id: 279, "name": "HB Counter Weak", "formation": "Pro Set", "type": "Run_Counter"});
db.playbook.insert({_id: 280, "name": "QB Off Tackle Strong", "formation": "Pro Set", "type": "Run_Tackle"});
db.playbook.insert({_id: 281, "name": "FB Off Tackle Weak", "formation": "Pro Set", "type": "Run_Tackle"});
db.playbook.insert({_id: 282, "name": "QB Off Tackle Strong", "formation": "I Form", "type": "Run_Tackle"});
db.playbook.insert({_id: 283, "name": "HB Blast Strong", "formation": "I Form", "type": "Run_Inside"});
db.playbook.insert({_id: 284, "name": "I Trap Counter Left", "formation": "I Form", "type": "Run_Counter"});
db.playbook.insert({_id: 285, "name": "HB Screen Left", "formation": "Strong I", "type": "Pass_Screen"});
db.playbook.insert({_id: 286, "name": "FB Screen Strong", "formation": "Strong I", "type": "Pass_Screen"});
db.playbook.insert({_id: 287, "name": "HB Screen Weak", "formation": "Singleback", "type": "Pass_Screen"});
db.playbook.insert({_id: 288, "name": "FB Screen Strong", "formation": "Weak I", "type": "Pass_Screen"});
db.playbook.insert({_id: 289, "name": "WR Screen Strong", "formation": "Shotgun 5WR", "type": "Pass_Screen"});
db.playbook.insert({_id: 291, "name": "FB Screen Strong", "formation": "Pro Set", "type": "Pass_Screen"});
db.playbook.insert({_id: 292, "name": "FB Screen Weak", "formation": "Pro Set", "type": "Pass_Screen"});
db.playbook.insert({_id: 293, "name": "FB Screen Strong", "formation": "I Form", "type": "Pass_Screen"});
db.playbook.insert({_id: 294, "name": "FB Screen Weak", "formation": "I Form", "type": "Pass_Screen"});
db.playbook.insert({_id: 295, "name": "HB Screen Left", "formation": "I Form", "type": "Pass_Screen"});
db.playbook.insert({_id: 296, "name": "HB Off Tackle Weak", "formation": "Goal Line", "type": "Run_Tackle"});
db.playbook.insert({_id: 297, "name": "HB Screen Strong", "formation": "Goal Line", "type": "Pass_Screen"});
db.playbook.insert({_id: 300, "name": "FB Screen Weak", "formation": "Goal Line", "type": "Pass_Screen"});
db.playbook.insert({_id: 301, "name": "HB Blast", "formation": "Goal Line", "type": "Run_Inside"});
db.playbook.insert({_id: 302, "name": "FB Sweep Weak", "formation": "Goal Line", "type": "Run_Outside"});
db.playbook.insert({_id: 303, "name": "HB Sweep Strong", "formation": "Goal Line", "type": "Run_Outside"});
db.playbook.insert({_id: 304, "name": "QB Rollout Weak", "formation": "Goal Line", "type": "Run_Outside"});
db.playbook.insert({_id: 305, "name": "QB Rollout Strong", "formation": "Goal Line", "type": "Run_Outside"});
db.playbook.insert({_id: 306, "name": "TE Lead", "formation": "Trips", "type": "Pass_Medium"});
db.playbook.insert({_id: 307, "name": "Flood Left", "formation": "Trips", "type": "Pass_Short"});
db.playbook.insert({_id: 308, "name": "WR1 Clearout", "formation": "Trips", "type": "Pass_Deep"});
db.playbook.insert({_id: 309, "name": "Trips Left Hooks", "formation": "Trips", "type": "Pass_Medium"});
db.playbook.insert({_id: 310, "name": "WR Unders", "formation": "Trips", "type": "Pass_Deep"});
db.playbook.insert({_id: 311, "name": "Trips Left Slants", "formation": "Trips", "type": "Pass_Deep"});
db.playbook.insert({_id: 312, "name": "Trips Left Quick Routes", "formation": "Trips", "type": "Pass_Short"});
db.playbook.insert({_id: 313, "name": "WR Posts", "formation": "Trips", "type": "Pass_Deep"});
db.playbook.insert({_id: 314, "name": "WR Cross", "formation": "Trips", "type": "Pass_Deep"});
db.playbook.insert({_id: 315, "name": "WR Drags", "formation": "Trips", "type": "Pass_Medium"});
db.playbook.insert({_id: 326, "name": "Quick Outs", "formation": "Singleback Big", "type": "Pass_Short"});
db.playbook.insert({_id: 327, "name": "Strong Overload", "formation": "Singleback Big", "type": "Pass_Short"});
db.playbook.insert({_id: 328, "name": "Weak Overload", "formation": "Singleback Big", "type": "Pass_Medium"});
db.playbook.insert({_id: 329, "name": "Middle Ins", "formation": "Singleback Big", "type": "Pass_Short"});
db.playbook.insert({_id: 330, "name": "Double Crosses", "formation": "Singleback Big", "type": "Pass_Deep"});
db.playbook.insert({_id: 331, "name": "Double TE Middle", "formation": "Singleback Big", "type": "Pass_Medium"});
db.playbook.insert({_id: 332, "name": "Double Slants", "formation": "Singleback Big", "type": "Pass_Deep"});
db.playbook.insert({_id: 333, "name": "TE Clearout", "formation": "Singleback Big", "type": "Pass_Deep"});
db.playbook.insert({_id: 334, "name": "Iso HB Under", "formation": "Singleback Big", "type": "Pass_Medium"});
db.playbook.insert({_id: 335, "name": "TE Drive", "formation": "Singleback Big", "type": "Pass_Deep"});
db.playbook.insert({_id: 336, "name": "Flanker Drag", "formation": "Singleback Big", "type": "Pass_Medium"});
db.playbook.insert({_id: 337, "name": "Quick Slants", "formation": "Big I", "type": "Pass_Medium"});
db.playbook.insert({_id: 338, "name": "TE Crosses", "formation": "Big I", "type": "Pass_Medium"});
db.playbook.insert({_id: 339, "name": "Middle Overload", "formation": "Big I", "type": "Pass_Medium"});
db.playbook.insert({_id: 340, "name": "TE Out and Up", "formation": "Big I", "type": "Pass_Medium"});
db.playbook.insert({_id: 341, "name": "TE Weak Overload", "formation": "Big I", "type": "Pass_Medium"});
db.playbook.insert({_id: 342, "name": "Quick Outs", "formation": "Big I", "type": "Pass_Short"});
db.playbook.insert({_id: 343, "name": "TE Deep Corners", "formation": "Big I", "type": "Pass_Deep"});
db.playbook.insert({_id: 344, "name": "Back Criss Cross", "formation": "Pro Set", "type": "Pass_Short"});
db.playbook.insert({_id: 345, "name": "HB Flat", "formation": "Strong I", "type": "Pass_Short"});
db.playbook.insert({_id: 346, "name": "TE Drag and Go", "formation": "I Form", "type": "Pass_Medium"});
db.playbook.insert({_id: 347, "name": "QB Rollout Rush Strong", "formation": "Singleback Big", "type": "Run_Outside"});
db.playbook.insert({_id: 348, "name": "QB Rollout Rush Weak", "formation": "Singleback Big", "type": "Run_Outside"});
db.playbook.insert({_id: 349, "name": "HB Dive", "formation": "Singleback Big", "type": "Run_Inside"});
db.playbook.insert({_id: 350, "name": "HB Dive Left", "formation": "Singleback Big", "type": "Run_Inside"});
db.playbook.insert({_id: 351, "name": "HB Slam", "formation": "Singleback Big", "type": "Run_Inside"});
db.playbook.insert({_id: 352, "name": "HB Slam Left", "formation": "Singleback Big", "type": "Run_Inside"});
db.playbook.insert({_id: 353, "name": "Off Tackle", "formation": "Singleback Big", "type": "Run_Tackle"});
db.playbook.insert({_id: 354, "name": "Off Tackle Left", "formation": "Singleback Big", "type": "Run_Tackle"});
db.playbook.insert({_id: 355, "name": "HB Counter Sweep Right", "formation": "Singleback Big", "type": "Run_Counter"});
db.playbook.insert({_id: 356, "name": "HB Counter Sweep Left", "formation": "Singleback Big", "type": "Run_Counter"});
db.playbook.insert({_id: 357, "name": "HB Sweep Right", "formation": "Singleback Big", "type": "Run_Outside"});
db.playbook.insert({_id: 358, "name": "HB Sweep Left", "formation": "Singleback Big", "type": "Run_Outside"});
db.playbook.insert({_id: 359, "name": "HB Counter Sweep Left", "formation": "Big I", "type": "Run_Outside"});
db.playbook.insert({_id: 360, "name": "QB Rollout Right", "formation": "Big I", "type": "Run_Outside"});
db.playbook.insert({_id: 361, "name": "QB Rollout Left", "formation": "Big I", "type": "Run_Outside"});
db.playbook.insert({_id: 362, "name": "FB Dive", "formation": "Big I", "type": "Run_Inside"});
db.playbook.insert({_id: 363, "name": "FB Slam Left", "formation": "Big I", "type": "Run_Inside"});
db.playbook.insert({_id: 364, "name": "FB Sweep Right", "formation": "Big I", "type": "Run_Outside"});
db.playbook.insert({_id: 365, "name": "HB Slam", "formation": "Big I", "type": "Run_Inside"});
db.playbook.insert({_id: 366, "name": "FB Sweep Left", "formation": "Big I", "type": "Run_Outside"});
db.playbook.insert({_id: 367, "name": "HB Slam Left", "formation": "Big I", "type": "Run_Tackle"});
db.playbook.insert({_id: 368, "name": "HB Blast Left", "formation": "Big I", "type": "Run_Inside"});
db.playbook.insert({_id: 369, "name": "HB Blast", "formation": "Big I", "type": "Run_Inside"});
db.playbook.insert({_id: 370, "name": "Off Tackle", "formation": "Big I", "type": "Run_Tackle"});
db.playbook.insert({_id: 371, "name": "Off Tackle Left", "formation": "Big I", "type": "Run_Tackle"});
db.playbook.insert({_id: 372, "name": "HB Sweep Left", "formation": "Big I", "type": "Run_Outside"});
db.playbook.insert({_id: 373, "name": "HB Sweep Right", "formation": "Big I", "type": "Run_Outside"});
db.playbook.insert({_id: 375, "name": "WR Drags", "formation": "Spread", "type": "Pass_Medium"});
db.playbook.insert({_id: 376, "name": "HB Clearout", "formation": "Spread", "type": "Pass_Deep"});
db.playbook.insert({_id: 377, "name": "WR1 Clearout", "formation": "Spread", "type": "Pass_Deep"});
db.playbook.insert({_id: 378, "name": "Strong Overload", "formation": "Spread", "type": "Pass_Medium"});
db.playbook.insert({_id: 379, "name": "4 Wide Hooks", "formation": "Spread", "type": "Pass_Short"});
db.playbook.insert({_id: 380, "name": "Weak Overload", "formation": "Spread", "type": "Pass_Medium"});
db.playbook.insert({_id: 381, "name": "4 WR Unders", "formation": "Spread", "type": "Pass_Deep"});
db.playbook.insert({_id: 382, "name": "Diamonds", "formation": "Spread", "type": "Pass_Deep"});
db.playbook.insert({_id: 383, "name": "4WR Slants", "formation": "Spread", "type": "Pass_Medium"});
db.playbook.insert({_id: 384, "name": "4WR Outs", "formation": "Spread", "type": "Pass_Short"});
db.playbook.insert({_id: 385, "name": "Double Cross", "formation": "Spread", "type": "Pass_Deep"});
db.playbook.insert({_id: 386, "name": "Ins and Outs", "formation": "Spread", "type": "Pass_Short"});
db.playbook.insert({_id: 387, "name": "QB Rollout Rush Strong", "formation": "Spread", "type": "Run_Outside"});
db.playbook.insert({_id: 388, "name": "QB Rollout Rush Weak", "formation": "Spread", "type": "Run_Outside"});
db.playbook.insert({_id: 389, "name": "HB Dive", "formation": "Spread", "type": "Run_Inside"});
db.playbook.insert({_id: 390, "name": "HB Dive Weak", "formation": "Spread", "type": "Run_Inside"});
db.playbook.insert({_id: 391, "name": "HB Slam", "formation": "Spread", "type": "Run_Tackle"});
db.playbook.insert({_id: 392, "name": "HB Slam Weak", "formation": "Spread", "type": "Run_Tackle"});
db.playbook.insert({_id: 393, "name": "Off Tackle", "formation": "Spread", "type": "Run_Tackle"});
db.playbook.insert({_id: 394, "name": "Off Tackle Weak", "formation": "Spread", "type": "Run_Tackle"});
db.playbook.insert({_id: 395, "name": "HB Pitch Strong", "formation": "Spread", "type": "Run_Outside"});
db.playbook.insert({_id: 396, "name": "HB Pitch Weak", "formation": "Spread", "type": "Run_Outside"});
db.playbook.insert({_id: 397, "name": "HB Pitch Weak", "formation": "Trips", "type": "Run_Outside"});
db.playbook.insert({_id: 398, "name": "HB Pitch Strong", "formation": "Trips", "type": "Run_Outside"});
db.playbook.insert({_id: 399, "name": "QB Rollout Rush Strong", "formation": "Trips", "type": "Run_Outside"});
db.playbook.insert({_id: 400, "name": "QB Rollout Rush Weak", "formation": "Trips", "type": "Run_Outside"});
db.playbook.insert({_id: 401, "name": "HB Slam", "formation": "Trips", "type": "Run_Inside"});
db.playbook.insert({_id: 402, "name": "HB Slam Weak", "formation": "Trips", "type": "Run_Tackle"});
db.playbook.insert({_id: 403, "name": "HB Dive", "formation": "Trips", "type": "Run_Inside"});
db.playbook.insert({_id: 404, "name": "HB Dive Weak", "formation": "Trips", "type": "Run_Inside"});
db.playbook.insert({_id: 405, "name": "HB Counter Strong", "formation": "Trips", "type": "Run_Counter"});
db.playbook.insert({_id: 406, "name": "Off Tackle Weak", "formation": "Trips", "type": "Run_Tackle"});
db.playbook.insert({_id: 407, "name": "HB Screen Weak", "formation": "Spread", "type": "Pass_Screen"});
db.playbook.insert({_id: 408, "name": "HB Screen Strong", "formation": "Spread", "type": "Pass_Screen"});
db.playbook.insert({_id: 409, "name": "WR Screen Strong", "formation": "Spread", "type": "Pass_Screen"});
db.playbook.insert({_id: 410, "name": "WR Screen Weak", "formation": "Spread", "type": "Pass_Screen"});
db.playbook.insert({_id: 411, "name": "HB Screen Left", "formation": "Singleback Big", "type": "Pass_Screen"});
db.playbook.insert({_id: 412, "name": "HB Screen Right", "formation": "Singleback Big", "type": "Pass_Screen"});
db.playbook.insert({_id: 413, "name": "FB Screen Right", "formation": "Big I", "type": "Pass_Screen"});
db.playbook.insert({_id: 414, "name": "HB Screen Left", "formation": "Big I", "type": "Pass_Screen"});
db.playbook.insert({_id: 415, "name": "TE Screen Left", "formation": "Big I", "type": "Pass_Screen"});
db.playbook.insert({_id: 416, "name": "WR3 Screen", "formation": "Trips", "type": "Pass_Screen"});
db.playbook.insert({_id: 417, "name": "WR1 Screen", "formation": "Trips", "type": "Pass_Screen"});
db.playbook.insert({_id: 418, "name": "HB Screen Strong", "formation": "Trips", "type": "Pass_Screen"});
db.playbook.insert({_id: 419, "name": "HB Screen Weak", "formation": "Trips", "type": "Pass_Screen"});
db.playbook.insert({_id: 420, "name": "FB Counter Strong", "formation": "Pro Set", "type": "Run_Counter"});
db.playbook.insert({_id: 421, "name": "HB Dive", "formation": "Strong I", "type": "Run_Inside"});
db.playbook.insert({_id: 422, "name": "HB Counter Sweep Weak", "formation": "Weak I", "type": "Run_Counter"});
db.playbook.insert({_id: 423, "name": "HB Dive Weak", "formation": "Weak I", "type": "Run_Inside"});
db.playbook.insert({_id: 424, "name": "HB Counter Sweep Strong", "formation": "Strong I", "type": "Run_Counter"});
db.playbook.insert({_id: 425, "name": "WR Screen Strong", "formation": "I Form", "type": "Pass_Screen"});
