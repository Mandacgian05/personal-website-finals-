import { Controller, Get, Post, Body } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase (Use your actual credentials from Supabase settings)
const supabase = createClient(
  'https://mzxnqzhteubmnappwiqe.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16eG5xemh0ZXVibW5hcHB3aXFlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTY5MzQ3NywiZXhwIjoyMDg3MjY5NDc3fQ.6ZBD3T9o0nopqI2AQVGnNcvCCrYZ3SjHh2V62o_oU8k'
);

@Controller('guestbook')
export class AppController {
  
  @Get()
  async getMessages() {
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) return { error: error.message };
    return data;
  }

  @Post()
  async createMessage(@Body() body: { name: string; message: string }) {
    const { data, error } = await supabase
      .from('guestbook')
      .insert([{ name: body.name, message: body.message }])
      .select();

    if (error) return { error: error.message };
    return data[0];
  }
}