<?php

namespace App\AssetLoader;

class EncoreEntryScriptTags extends EncoreEntryTags
{
    public function __invoke(): void
    {
        $this->renderEncoreScriptTags();
    }

    private function renderEncoreScriptTags(): void
    {
        foreach ($this->entrypoints['entrypoints'] as $app) {
            foreach ($app['js'] as $js) {
                echo sprintf('<script src="%s" integrity="%s"></script>', $js, $this->getIntegrityHash($js));
            }
        }
    }
}