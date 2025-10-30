import { useState } from 'preact/hooks';
import './app.css'; // Este archivo debe existir de la plantilla inicial

export function App() {
  // Estado para guardar lo que el usuario escribe
  const [prompt, setPrompt] = useState('');
  // Estado para guardar la URL de la imagen generada
  const [imageUrl, setImageUrl] = useState(null);
  // Estado para saber si estamos "cargando"
  const [loading, setLoading] = useState(false);
  // Estado para mostrar errores en UI
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('Generando imagen para:', prompt);
      setLoading(true);
      setImageUrl(null);
      setErrorMessage(null);
    
    // --- TODO: Aquí llamaremos a nuestra API (Paso 2 y 3 del MVP) ---
    
try {
      const response = await fetch('/api/generate', { // Llama a nuestro backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }), // Envía el prompt en el body
      });

      if (!response.ok) {
        // Intentar leer mensaje de error del servidor
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
      setImageUrl(data.imageUrl); // ¡Establecemos la imagen real!

    } catch (error) {
      console.error('Error al llamar al API:', error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false); // Quita el estado de "cargando"
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

      {/* Área para mostrar la imagen generada */}
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