# 💣 EX1DUZ ROLE NUKER

A powerful Discord bot to **bulk delete roles instantly** using a slash command.  
No clicking. No manual deletion. Just **one command = clean server**.

> ⚠️ Built for server owners & admins only.

---

## 🚀 Features

✅ Bulk delete **all deletable roles**  
✅ Skips bot-managed & higher roles safely  
✅ Slash command based (`/deleteroles`)  
✅ Diagnostic command (`/checkroles`)  
✅ Clean embed responses  
✅ Fast & rate-limit safe  
✅ Open-source & customizable  


---

## 🛠️ Requirements

- Node.js **v18+**
- Discord Bot with:
  - `Manage Roles`
  - `Use Slash Commands`
- Bot role **must be ABOVE roles you want to delete**

---

## 📦 Installation

```bash
git clone https://github.com/YOUR_USERNAME/ex1duz-role-nuker.git
cd ex1duz-role-nuker
npm install 

---
## HOW TO RUN

Step 1 :- make a discord bot here (https://discord.com/developers/applications)
Step 2 :- add bot to server with admin permissions
step 3 :- Then Replace bot token , bot client id and server id in .env File
step 4 :- In Command Prompt 
          1) cd ex1duz-role-nuker
          2) node register.js
          3) node index.js
step 5 :- give higer role to our added custom bot.
step 6 :- Commands (run in discord server where you want your roles to be deleted )
          1) /checkroles ( displays all roles that are deletable)
          2) /deleteroles (⚠️ Deletes ALL deletable roles instantly) 
