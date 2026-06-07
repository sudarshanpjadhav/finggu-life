# 🏠 finggu-life — आपका पैसा, आपका हिसाब

> **India-first personal finance dashboard for everyday people.**  
> Track daily expenses, EMIs, utility bills, savings goals, and family budget — all in one place. Works completely offline. No signup. No ads. Free forever.

<div align="center">

[![Stars](https://img.shields.io/github/stars/sudarshanpjadhav/finggu-life?style=for-the-badge&color=f78166)](https://github.com/sudarshanpjadhav/finggu-life/stargazers)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)
[![PWA](https://img.shields.io/badge/PWA-ready-green?style=for-the-badge)](https://sudarshanpjadhav.github.io/finggu-life)
[![Offline](https://img.shields.io/badge/Works-Offline-orange?style=for-the-badge)](#)

**[Live Demo →](https://sudarshanpjadhav.github.io/finggu-life)**

</div>

---

## 📱 What is finggu-life?

A beautifully simple finance tracker built for Indian families and individuals. No complicated setup, no cloud account, no subscription fee.

```
Your money stays on YOUR phone.
Everything works offline.
Share with family via WhatsApp — it's just a link.
```

### 🇮🇳 Made for India

- ₹ Rupee everywhere — not $ or €
- EMI tracking for home loans, car loans, personal loans
- Bill reminders for electricity, internet, mobile, rent
- Family budget with per-member tracking
- Supports Hindi (हिंदी) and Marathi (मराठी)
- Works on ₹5,000 phones with slow internet

---

## ✨ Features

### 💸 Daily Expenses
- Add income and expenses in seconds
- 11 smart categories: Food, Travel, Shopping, Health, Utility, EMI, Study, Fun, Salary, Investment
- Monthly view with spending breakdown by category
- Visual bar chart showing where your money goes
- Filter by category, member, or month

### 🏦 EMI Tracker
- Track all your home loans, car loans, personal loans
- See monthly EMI total at a glance
- Progress bar showing how much you've paid off
- Due date alerts — never miss an EMI
- Interest rate and tenure tracking

### 📋 Bill Reminders
- Never forget electricity, internet, or mobile bill again
- Color-coded urgency: 🔴 Overdue · 🟡 Due soon · ✅ Paid
- One-tap mark as paid
- Supports monthly, quarterly, and yearly bills
- Categories: Electricity, Internet, Mobile, Rent, Water, Gas, OTT, Gym, School

### 🎯 Savings Goals
- Create goals for phone, vacation, home, emergency fund
- Visual progress bar with % completion
- Add money to goals with one tap
- Monthly savings needed calculator
- 🎉 Celebration when goal is achieved!

### 👨‍👩‍👧 Family Budget
- Add all family members with individual budgets
- See who is spending what this month
- Budget vs actual bar for each member
- Filter expenses by family member

---

## 🚀 Quick Start

### Option 1: Use Online (Recommended)
Visit **[sudarshanpjadhav.github.io/finggu-life](https://sudarshanpjadhav.github.io/finggu-life)**  
Install as app on your phone → tap **"Add to Home Screen"**

### Option 2: Download & Use Offline
```bash
# Download the single HTML file
wget https://raw.githubusercontent.com/sudarshanpjadhav/finggu-life/main/standalone/index.html

# Open in browser — works 100% offline
# Share via WhatsApp — just send the file!
```

### Option 3: Self-host
```bash
git clone https://github.com/sudarshanpjadhav/finggu-life
cd finggu-life/standalone

# Serve locally
npx serve .
# or
python3 -m http.server 8080
```

---

## 📲 Install as Phone App (PWA)

### Android (Chrome)
1. Open the link in Chrome
2. Tap menu (⋮) → **"Add to Home screen"**
3. Done! Opens like a real app, works offline

### iPhone (Safari)
1. Open the link in Safari
2. Tap Share button → **"Add to Home Screen"**
3. Done!

---

## 🔒 Privacy — Your Data Stays With You

- **Zero servers** — all data saved in your browser's localStorage
- **No account needed** — open and use immediately
- **No tracking** — no analytics, no ads, no cookies
- **Export anytime** — your data, your control

---

## 🌍 Languages

| Language | Status |
|----------|--------|
| English | ✅ Complete |
| हिंदी (Hindi) | ✅ Complete |
| मराठी (Marathi) | ✅ Complete |

Switch language anytime with the EN / हि / म buttons in the header.

---

## 📁 Project Structure

```
finggu-life/
├── standalone/           ← Single-file version (share via WhatsApp)
│   ├── index.html        ← Complete app in one file
│   ├── manifest.json     ← PWA manifest
│   ├── sw.js             ← Service worker (offline support)
│   ├── register-sw.js    ← PWA registration
│   └── generate-icons.js ← Icon generator utility
├── .github/
│   └── workflows/
│       └── deploy.yml    ← Auto-deploy to GitHub Pages
├── README.md
└── LICENSE
```

---

## 🤝 Contributing

This is built for real people. Contributions that help common users are most welcome:

- 🐛 Bug fixes
- 🌐 New language translations (Tamil, Telugu, Gujarati, Bengali...)
- 💡 Feature ideas from real daily life problems
- 📱 UI improvements for low-end Android phones

Open an issue or PR — we review within 48 hours.

---

## 🙏 Share This

If this helped you manage your money better, share it with your family!

**WhatsApp message to share:**
> "यह app try करो — finggu-life. Expenses, EMI, bills सब एक जगह track होते हैं। No signup, free है। 👉 https://sudarshanpjadhav.github.io/finggu-life"

---

## 📄 License

MIT © [Finggu / Sudarshan P Jadhav](https://finggu.com)

---

<div align="center">
  <sub>Built with ❤️ for India by <a href="https://finggu.com">Finggu</a><br>
  आपका पैसा, आपका हिसाब — Your money, your account</sub>
</div>
