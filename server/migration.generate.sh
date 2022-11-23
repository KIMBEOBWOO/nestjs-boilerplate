#!/bin/sh

# The first parameter should provide an environment to which migration will be applied.
# Select dev, production.
Environment=$1

# The second parameter provides the path to the data source file
# If the path does not need to be received when executing the script file,
# substitute a string to the value of the corresponding variable.
DataSourcePath=$2
# The third parameter provides the path through which the migration file will be created
GeneratedMigrationFilePath=$3

# Generate migration, if No changes in database schema were found, Error code 1
yarn run typeorm:${Environment} --dataSource=${DataSourcePath} migration:generate ${GeneratedMigrationFilePath}
