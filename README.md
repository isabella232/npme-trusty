# npmE-Trusty Installer

This module bootstraps an npmE install on Ubuntu Trusty:

1. it installs the ansible bin using apt.
2. it runs the [ansible-npme](https://github.com/npm/ansible-npme) role to bootstrap:
  * CouchDB, Nginx, etc.
3. it installs npm Enterprise from the private registry.
