import s from './Icon.module.css';

export const Icon: React.FC<{ name: string }> = function (props) {
  return (
    <svg className={s.Icon} aria-hidden="true">
      <use xlinkHref={`#${props.name}`}></use>
    </svg>
  );
};
