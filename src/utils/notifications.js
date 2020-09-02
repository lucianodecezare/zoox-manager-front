import { Notify } from 'quasar';

// Mostra notificações no canto superior direito
const notifications = {
  error: (message) => Notify.create({
    type: 'negative',
    message,
  }),
  success: (message) => Notify.create({
    type: 'positive',
    message,
  }),
};

export { notifications };
