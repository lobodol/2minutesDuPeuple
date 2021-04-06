<?php

namespace App\AssetLoader;

abstract class EncoreEntryTags
{
    /**
     * List of entrypoints extracted from public/build/entrypoints.json
     *
     * @var array
     */
    protected array $entrypoints;

    public function __construct()
    {
        $json              = @file_get_contents(__DIR__.'/../../public/build/entrypoints.json');
        $this->entrypoints = @json_decode($json, true) ?? [];
    }

    protected function getIntegrityHash(string $asset): string
    {
        return $this->entrypoints['integrity'][$asset] ?? '';
    }

}