#!/bin/sh

# The first parameter provides the path to the data source file
# If the path does not need to be received when executing the script file,
# substitute a string to the value of the corresponding variable.
DataSourcePath=$1
# The second parameter provides the path through which the migration file will be created
GeneratedMigrationFilePath=$2

# Generate migration, if No changes in database schema were found, Error code 1
yarn run typeorm --dataSource=${DataSourcePath} migration:generate ${GeneratedMigrationFilePath}
