export default function randEmoji() {
  const emoji = [':‑(', ':‑<', ':‑[', ':-||', '>:[', ':(', ':\'(', '</3'];
  return emoji[Math.floor(Math.random() * emoji.length)];
}
