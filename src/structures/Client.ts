import { Client, ClientOptions, Collection } from 'discord.js';
import { Command } from './Command';
import { Event } from './Event';
import { Button } from './Button';

export class ExtendedClient extends Client {

  public commands: Collection<string, Command> = new Collection();
  public buttons: Collection<string, Button> = new Collection();
  public events: Collection<string, Event> = new Collection();
  constructor(options: ClientOptions) {
    super(options);
  }
}
