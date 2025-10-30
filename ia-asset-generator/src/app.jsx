import { useState } from 'preact/hooks';
import './app.css'; // Stylesheet provided by the starter template

export function App() {
  // User's text input prompt
  const [prompt, setPrompt] = useState('');
  // URL of the generated image
  const [imageUrl, setImageUrl] = useState(null);
  // Loading state while generation is in progress
  const [loading, setLoading] = useState(false);
  // Error message shown in the UI
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('Generando imagen para:', prompt);
      setLoading(true);
      setImageUrl(null);
      setErrorMessage(null);
    
    // Make a request to our backend API
    
try {
      const response = await fetch('/api/generate', { // Call our backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }), // Send the prompt in the JSON body
      });

      if (!response.ok) {
        // Try to read a detailed error message from the server
        let details = null;
        try {
          details = await response.json();
        } catch (_) {}
        const message = details?.message || `Error del servidor: ${response.status}`;
        const extra = details?.title ? ` (${details.title})` : '';
        const full = details?.error ? `${message}${extra} — ${details.error}` : `${message}${extra}`;
        throw new Error(full);
      }

      const data = await response.json();
      setImageUrl(data.imageUrl); // Show the generated image in the UI

    } catch (error) {
      console.error('Error al llamar al API:', error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false); // End the loading state
    }
  };

  return (
    <div style={{ maxWidth: '512px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Generador de Assets con IA</h2>
      <p>Describe el asset que quieres crear (ej. "Un sprite de un cofre del tesoro, pixel art").</p>
      
      <form onSubmit={handleSubmit}>
        <textarea
          style={{ width: '100%', minHeight: '80px', boxSizing: 'border-box', padding: '10px', fontSize: '16px' }}
          placeholder="Ej: Un caballero con armadura brillante, pixel art, 8-bit..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button 
          type="submit" 
          style={{ width: '100%', padding: '15px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer', fontSize: '18px', marginTop: '10px' }}
          disabled={loading || !prompt}
        >
          {loading ? 'Generando...' : 'Generar'}
        </button>
      </form>

      {/* Area to display the generated image */}
      {loading && (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>Cargando...</p>
      )}

      {errorMessage && (
        <p style={{ textAlign: 'center', marginTop: '20px', color: 'crimson' }}>
          {errorMessage}
        </p>
      )}

      {imageUrl && (
        <div style={{ marginTop: '20px' }}>
          <h3>Resultado:</h3>
          <img src={imageUrl} alt="Asset generado" style={{ width: '100%', border: '1px solid #ccc' }} />
        </div>
      )}
    </div>
  );
}