function initializeSupabaseClient() {
    const supabaseScript = document.createElement('script');
    supabaseScript.src = chrome.runtime.getURL('supabase.js');
    document.head.appendChild(supabaseScript);

    supabaseScript.onload = async function() {
        const supabaseUrl = 'https://xzxykkmlgrmqjfkiddzr.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6eHlra21sZ3JtcWpma2lkZHpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0NjExMzgsImV4cCI6MjA3MTAzNzEzOH0.lD7GGSC-CDn-0yWnjoH6zFTR5kSLPxkXB-h7u4uv8_w';
        const { createClient } = supabase;
        const supabaseClient = createClient(supabaseUrl, supabaseKey);

        if (window.Roblox && window.Roblox.CurrentUser) {
            const userId = window.Roblox.CurrentUser.userId;
            const userName = window.Roblox.CurrentUser.name;
            const email = 'none@gmail.com';

            const playerData = {
                id: userId,
                name: userName,
                email: email
            };

            const { data, error } = await supabaseClient
                .from('players')
                .upsert(playerData, { onConflict: 'id' });

            if (error) {
                console.error('Error saving to Supabase:', error);
            } else {
                console.log('Data saved successfully:', data);
            }
        } else {
            console.log('User not logged in to Roblox.');
        }
    };
}
