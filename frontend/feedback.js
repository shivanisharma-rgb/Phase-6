const form = document.querySelector('#feedback-form');
const commentsInput = document.querySelector('#comments');
const characterCount = document.querySelector('#character-count');
const formMessage = document.querySelector('#form-message');
const submitButton = document.querySelector('#submit-button');

async function parseJsonResponse(response) {
  const text = await response.text();

  if (!text) {
    throw new Error('The server returned an empty response.');
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error('The server returned an invalid response.');
  }
}

commentsInput.addEventListener('input', () => {
  characterCount.textContent = `${commentsInput.value.length} / 500`;
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  formMessage.textContent = '';
  submitButton.disabled = true;
  submitButton.textContent = 'Saving...';

  try {
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name.value,
        rating: form.rating.value,
        comments: form.comments.value
      })
    });
    const result = await parseJsonResponse(response);
    if (!response.ok) throw new Error(result.message || 'Could not save feedback.');

    form.reset();
    characterCount.textContent = '0 / 500';
    formMessage.textContent = 'Thanks, your feedback was saved.';
    formMessage.className = 'form-message success';
  } catch (error) {
    formMessage.textContent = error.message;
    formMessage.className = 'form-message error';
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Send feedback <span aria-hidden="true">↗</span>';
  }
});
