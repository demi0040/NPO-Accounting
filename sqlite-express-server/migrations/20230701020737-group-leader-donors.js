'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, ) {
  const sql = `ALTER TABLE donors
                    ADD COLUMN is_representative INT(1) NOT NULL DEFAULT 0;`;

  db.runSql(sql);
};

exports.down = function(db) {
  const sql = `ALTER TABLE donors
                    DROP COLUMN is_representative;`;

  db.runSql(sql);
};

exports._meta = {
  "version": 1
};
