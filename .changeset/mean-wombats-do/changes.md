Move default pages into their own folder, then copy the folder contents into pages on each build

This fixes an internal problem where change what docs are generated could cause unneeded pages
to persist, slowing brisk down. This should not change the user experience.
