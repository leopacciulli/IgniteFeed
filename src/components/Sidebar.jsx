import { PencilSimpleLine } from 'phosphor-react';
import { Avatar } from './Avatar';

import styles from './Sidebar.module.css';

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <img
        src="https://media-exp1.licdn.com/dms/image/C4D16AQHpwoiB_5i3kg/profile-displaybackgroundimage-shrink_350_1400/0/1592302990810?e=1659571200&v=beta&t=3-IebdG906KZR9mnUUk0Lxzv8uPikUa4VisJlM8pHR4"
        className={styles.cover}
      />

      <div className={styles.profile}>
        <Avatar hasBorder src="https://github.com/leopacciulli.png" />

        <strong>Leonardo Pacciulli</strong>
        <span>Front-end Developer</span>
      </div>

      <footer>
        <a href="#">
          <PencilSimpleLine size={20} />
          Editar seu perfil
        </a>
      </footer>
    </aside>
  )
}