import { useFormStore } from '@/stores/useFormStore';
import { ref } from 'vue';

export function useSendData() {
  const formStore = useFormStore();
  const toastMessage = ref('');
  const showToast = ref(false);

  async function sendData(): Promise<void> {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'POST',
          body: JSON.stringify(formStore.$state),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to send data: ${response.statusText}`);
      }

      const json = await response.json();

      //to check response from test api
      console.log('Response Data:', json);

      toastMessage.value = 'Data byla úspěšně odeslána!';
      showToast.value = true;
    } catch (error) {
      console.error('Error sending data:', error);
    }
  }

  return { sendData, toastMessage, showToast };
}
