Remove the possibility of specifying docsList/packagesPaths from config.

Before this change, specifying `docsList` or `packagesPaths` would override
the intended configuration of the `docs`/`packages` entries.
