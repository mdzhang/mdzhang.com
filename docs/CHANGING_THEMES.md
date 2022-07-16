# Changing Themes

1. Find a theme
1. Add as submodule in `themes/` folder e.g.
    ```sh
    git submodule add https://github.com/monkeyWzr/hugo-theme-cactus themes/cactus
    ```

    - check that `.gitmodules` reflects update
1. Update `theme = ""` in [config.toml](../config.toml)
    ```diff
    - theme = "sam"
    + theme = "cactus"
    ```
1. Update config values in [config.toml](../config.toml) per theme; see a theme's example site in their source code under `exampleSite/`  e.g. <https://github.com/monkeyWzr/hugo-theme-cactus/blob/main/exampleSite/config.toml>
