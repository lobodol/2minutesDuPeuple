# Player du peuple
Responsive web player for "les deux minutes du peuple".
Demo at [www.les2minutesdupeuple.tk](http://www.les2minutesdupeuple.tk).

This version is a from-scratch-project. Next release will be done with Symfony Framework 3 shiping with a cool REST API.

## Database structure
```sql
CREATE TABLE `episodes` (
  `id` int(11) NOT NULL,
  `episode_nr` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `details` varchar(255) DEFAULT NULL,
  `keywords` text
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
```

## Configuration
Set database crendetials in `config/database.ini`.
