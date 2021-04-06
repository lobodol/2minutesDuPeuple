<?php

namespace App\AssetLoader;

class AssetLoader
{
    public function __invoke(string $asset): void
    {
        echo $this->asset($asset);
    }

    /**
     * @param string $asset
     *
     * @return string
     */
    public function asset(string $asset): string
    {
        $manifest = @file_get_contents(__DIR__.'/../../public/build/manifest.json');

        if ($manifest && ($manifest = @json_decode($manifest, true)) && isset($manifest[$asset])) {
            $asset = $manifest[$asset];
        }

        return $asset;
    }

}