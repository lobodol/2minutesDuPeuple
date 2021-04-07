CREATE TABLE IF NOT EXISTS`episodes`
(
    `id`         int(11) NOT NULL,
    `episode_nr` int(11) NOT NULL,
    `titre`      varchar(255) NOT NULL,
    `details`    varchar(255) DEFAULT NULL,
    `keywords`   text
) ENGINE=MyISAM DEFAULT CHARSET=utf8;