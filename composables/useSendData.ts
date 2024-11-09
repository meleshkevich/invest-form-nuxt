import { useFormStore } from '@/stores/useFormStore';
import { useRouter } from 'vue-router';

export function useSendData() {
  const formStore = useFormStore();
  const router = useRouter();

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

      console.log('Response Data:', json);

      router.push({ path: '/summary', query: { data: JSON.stringify(json) } });
    } catch (error) {
      console.error('Error sending data:', error);
    }
  }

  return { sendData };
}
