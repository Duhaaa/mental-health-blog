import styles from '../styles/About.module.scss';

export default function About() {
  return (
    <div id="about" className={styles.aboutContainer}>
      <div className={styles.aboutContent}>
        <h2 className={styles.aboutTitle}>Chasing the <span>dream</span></h2>
        <p>I have always dreamed of creating my own blog that I can put online for the world to see. Coming up with a topic was relatively easy. For the past half-year, I have been struggling with my mental well-being because of trauma and my own mental disorder. This impacted me on different levels and talking about this topic with my family was never an easy task. I grew up in a multicultural household with predominantly Asian and Western values and norms. Mental health was never discussed back home, and it was extremely stigmatized. It was only until recently that I am opening up more about my struggle after years of turbulent moods, and anxiety. Exposing myself is very scary because mental illness is stigmatized within my culture. Recently, I decided to seek professional help. As part of my healing journey, I want to create something that adds value. Something relevant for both me and others who are also struggling with their mental health.</p>
        <p>This is how Internalized came to exist. The only way to destigmatize mental health is to talk about it, and educate others around us. Mental illness appears in different forms, and we can only start to understand each other when we communicate our battles. Sometimes we are not doing okay, and that should be fine too. Sometimes our internal struggles, which are easily bottled up, have to leave our bodies.</p>
        <p>For now, the main goal is to share personal experiences and to show personal stories of individuals that are also dealing with taboos and stigmas. By portraying the topic of mental health in different cultures, I hope that some of you may be able to relate to this. Or at least learn something new.</p>
      </div>
      <div className={styles.aboutImage}>
        <img src="/about.svg" alt="girl sitting on a browser with a laptop on her lap" />
      </div>
    </div>
  )
}
