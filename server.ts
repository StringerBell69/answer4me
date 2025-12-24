import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const server = Bun.serve({
  port: 3001,
  async fetch(req) {
    const url = new URL(req.url);
    
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    if (url.pathname === '/api/waitlist' && req.method === 'POST') {
      try {
        const { email, sector, problem } = await req.json();
        
        if (!email || !sector) {
          return new Response(
            JSON.stringify({ error: 'Email et secteur requis' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        
        const result = await pool.query(
          `INSERT INTO waitlist (email, sector, problem) 
           VALUES ($1, $2, $3) 
           ON CONFLICT (email) DO UPDATE SET 
             sector = EXCLUDED.sector,
             problem = EXCLUDED.problem
           RETURNING id, email, created_at`,
          [email, sector, problem || null]
        );
        
        console.log(`✅ Nouvelle inscription: ${email} (${sector})`);
        
        return new Response(
          JSON.stringify({ success: true, data: result.rows[0] }),
          { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (error) {
        console.error('❌ Erreur:', error);
        return new Response(
          JSON.stringify({ error: 'Erreur serveur' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }
    
    if (url.pathname === '/api/waitlist' && req.method === 'GET') {
      try {
        const result = await pool.query(
          'SELECT id, email, sector, problem, status, created_at FROM waitlist ORDER BY created_at DESC'
        );
        return new Response(
          JSON.stringify({ data: result.rows, total: result.rowCount }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (error) {
        console.error('❌ Erreur:', error);
        return new Response(
          JSON.stringify({ error: 'Erreur serveur' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    if (url.pathname === '/api/waitlist/count' && req.method === 'GET') {
      try {
        const result = await pool.query('SELECT COUNT(*) FROM waitlist');
        const realCount = parseInt(result.rows[0].count, 10);
        const displayCount = 13 + realCount; // 13 fictives + vraies inscriptions
        return new Response(
          JSON.stringify({ count: displayCount, real: realCount }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (error) {
        console.error('❌ Erreur:', error);
        return new Response(
          JSON.stringify({ error: 'Erreur serveur' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }
    
    return new Response('Not Found', { status: 404, headers: corsHeaders });
  },
});

console.log(`🚀 API Server running at http://localhost:${server.port}`);
