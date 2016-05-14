use nxow7a90d6uh3egj;

CREATE TABLE `players` (
  `id` Int( 11 ) AUTO_INCREMENT NOT NULL,
  `routeName` VARCHAR( 255) NOT NULL,
  `site` VARCHAR( 255 ) NOT NULL,
  `name` VARCHAR( 255 ) NOT NULL,
  `class` VARCHAR( 255 ) NOT NULL,
  `strength` Int(11) NOT NULL,
  `intelligence` Int(11) NOT NULL,
  `threat` Int(11) NOT NULL,
  `hitPoints` Int(11) NOT NULL,
  `dodge` Int(11) NOT NULL,
    PRIMARY KEY ( `id` ) );