![FreeSewing](https://freesewing.org/banner.jpg)
<p align='center'><a
  href="https://chat.freesewing.org"
  title="Chat with us on Discord"
  ><img src="https://img.shields.io/discord/698854858052075530?label=Chat%20on%20Discord"
  alt="Chat with us on Discord"/>
  </a><a
  href="https://twitter.com/freesewing_org"
  title="Follow @freesewing_org on Twitter"
  ><img src="https://img.shields.io/badge/%F3%A0%80%A0-Follow%20us-blue.svg?logo=twitter&logoColor=white&logoWidth=15"
  alt="Follow @freesewing_org on Twitter"/>
  </a><a
  href="https://instagram.com/freesewing_org"
  title="Follow @freesewing_org on Twitter"
  ><img src="https://img.shields.io/badge/%F3%A0%80%A0-Follow%20us-E4405F.svg?logo=instagram&logoColor=white&logoWidth=15"
  alt="Follow @freesewing_org on Twitter"/>
  </a><a
  href="https://freesewing.org/patrons/join"
  title="Become a FreeSewing Patron"
  ><img src="https://img.shields.io/badge/%F3%A0%80%A0-Support%20us-blueviolet.svg?logo=cash-app&logoColor=white&logoWidth=15"
  alt="Become a FreeSewing Patron"/>
  </a></p>

## What am I looking at? 🤔

This repository holds our Ansible playbooks.  
If you are not familier with Ansible, you can learn more at [www.ansible.com](https://www.ansible.com/).

## Getting started

Our infrastructure is defined in the `inventory.yaml` file. 
These playbooks only apply to our backend system, as our frontend is hosted by Netlify.

To run a playbook, use the following command structure:

```bash
ansible-playbook -i inventory.yaml -l main playbooks/install_updates.yaml
```

Where

 - The `-i` switch tells Ansible what inventory file to use.
 - The `-l` switch limites the play to a group of hosts. 
 You can pick `main` or `next` here. If you leave it out, it will apply to both.
 - The last paramter is the path to the playbook to run

Keep in mind that while we have 2 hosts in our inventory, in reality they run on the same VM.
So when you launch a playbook that does things on the OS level (such as installing updates in
our example) you should always limit the play  to either `main` or `next` because:

 - There's no point running it twice on the same machine
 - There will be conflicts as teh plays are ran in parallel, 
 so in our example, only one of them will be able to get a lock for apt, 
 the other will fail.

## Playbooks

 - `install_updates.yaml`: Install the latest OS updates
 - `backup_mongo.yaml`: Manually trigger a backup of the mongo database
 - `schedule_daily_mongo_backup.yaml`: Schedule a daily cron job to backup the mongo database
 - `clone_production_database.yaml`: Clones the production `freesewing` database into the `next_freesewing` database
 - `migrate_data_for_2.2.yaml`: Migrates data and data structure from 2.1 to 2.2 (run this after cloning the database)

## About FreeSewing 💀

Where the world of makers and developers collide, that's where you'll find FreeSewing.

Our [core library](https://freesewing.dev/) is a *batteries-included* toolbox
for parametric design of sewing patterns. It's a modular system (check our list
of [plugins](https://freesewing.dev/plugins) and getting started is as simple as:

```bash
npm init freesewing-pattern
```

We also have [a template repository](https://github.com/freesewing/pattern) if you prefer to start that way.

Developer documentation is maintained on [freesewing.dev](https://freesewing.dev/) and
we also have a `#development-help` channel on [Discord](https://discord.freesewing.org/).

If you're a maker, checkout [freesewing.org](https://freesewing.org/) where you can generate
our sewing patterns adapted to your measurements.

## Support FreeSewing: Become a patron 🥰

FreeSewing is an open source project run by a community, 
and financially supported by our patrons.

If you feel what we do is worthwhile, you too 
should [become a patron](https://freesewing.org/patrons/join).

## Links 👩‍💻

 - 💻 Makers website: [freesewing.org](https://freesewing.org)
 - 💻 Developers website: [freesewing.dev](https://freesewing.org)
 - 💬 Chat: On Discord via [discord.freesewing.org](https://discord.freesewing.org/)
 - 🐦 Twitter: [@freesewing_org](https://twitter.com/freesewing_org)
 - 📷 Instagram: [@freesewing_org](https://instagram.com/freesewing_org)

## License: MIT 🤓

© [Joost De Cock](https://github.com/joostdecock).  
See [the license file](https://github.com/freesewing/freesewing/blob/develop/LICENSE) for details.

## Where to get help 🤯

Our [chat rooms on Discord](https://discord.freesewing.org) are the best place to ask questions,
share your feedback, or just hang out.

If you want to report a problem, please [create an issue](https://github.com/freesewing/freesewing/issues/new).

