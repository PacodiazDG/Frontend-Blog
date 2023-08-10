export default function randEmoji() {
  const emoji = [':‑(', ':‑<', ':‑[', ':-||', '>:[', ':(', ':\'(', '</3', ':\'v'];
  return emoji[Math.floor(Math.random() * emoji.length)];
}
