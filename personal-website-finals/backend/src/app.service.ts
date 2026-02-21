import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class AppService {
  private supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_KEY || ''
  );

  async getMessages() {
    const { data } = await this.supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });
    return data;
  }

  async postMessage(name: string, message: string) {
    const { data } = await this.supabase
      .from('guestbook')
      .insert([{ name, message }]);
    return data;
  }
}