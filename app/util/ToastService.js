import { Toast } from 'native-base';

function showToast(message) {
  return (
    Toast.show({
      text: message,
      duration: 1200,
    })
  );
}

export default showToast;
