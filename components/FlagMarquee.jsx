import styles from './FlagMarquee.module.css';

// A continuously scrolling band of qualified/expected nation flags — pure CSS
// marquee, doubled so it loops seamlessly. Decorative; aria-hidden.
const FLAGS = [
  '🇧🇷','🇦🇷','🇲🇽','🇺🇸','🇨🇦','🇫🇷','🇩🇪','🇪🇸','🇵🇹','🇮🇹','🇳🇱','🇧🇪','🇭🇷','🇰🇷','🇯🇵',
  '🇸🇦','🇲🇦','🇸🇳','🇬🇭','🇳🇬','🇨🇲','🇪🇬','🇨🇴','🇺🇾','🇪🇨','🇨🇱','🇮🇷','🇦🇺','🇶🇦','🇵🇱',
  '🇩🇰','🇨🇭','🇷🇸','🇬🇧','🇮🇪','🇳🇴','🇸🇪','🇹🇷','🇬🇷','🇨🇷',
];

export default function FlagMarquee() {
  const row = [...FLAGS, ...FLAGS];
  return (
    <div className={styles.marquee} aria-hidden>
      <div className={styles.track}>
        {row.map((f, i) => <span key={i} className={styles.flag}>{f}</span>)}
      </div>
    </div>
  );
}
