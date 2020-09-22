import {
  trigger,
  group,
  transition,
  animate,
  style,
  state,
} from '@angular/animations';

export const flyInOut = trigger('flyInOut', [
  state(
    'in',
    style({
      width: 120,
      transform: 'translateX(0)',
      opacity: 1,
    })
  ),
  transition('void => *', [
    style({ width: 10, transform: 'translateX(500px)', opacity: 0 }),
    group([
      animate(
        '1s 0.1s ease',
        style({
          transform: 'translateX(500px)',
          width: 120,
        })
      ),
      animate(
        '0.3s ease',
        style({
          opacity: 1,
        })
      ),
    ]),
  ]),
]);
