/**
 * Copies text to clipboard using the Clipboard API when available,
 * falling back to a hidden textarea + execCommand for non-secure contexts.
 */
export async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    (document as Document & { execCommand: (cmd: string) => boolean }).execCommand('copy');
    textArea.remove();
  }
}
