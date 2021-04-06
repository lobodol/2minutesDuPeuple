<?php

namespace App\AssetLoader;

class EncoreEntryLinkTags extends EncoreEntryTags
{
    public function __invoke(): void
    {
        $this->renderEncoreLinkTags();
    }

    private function renderEncoreLinkTags(): void
    {
        foreach ($this->entrypoints['entrypoints'] as $app) {
            foreach ($app['css'] as $css) {
                echo sprintf('<link rel="stylesheet" type="text/css" href="%s" integrity="%s">', $css, $this->getIntegrityHash($css));
            }
        }
    }
}