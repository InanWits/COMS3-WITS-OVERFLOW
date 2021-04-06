const mysql = require('mysql');

module.exports = {
    //--------------------------------INSERT
    /*
    * builds an insert query that inserts values specified by columns
    * */
    buildInsertQuery: (tableName, columns, data) => {
        const values = [];

        columns.forEach(column => {
            const value = data[column];

            if (value == null) return null;

            values.push(mysql.escape(value));
        });

        return `insert into ${tableName} (${columns.toString()}) values (${values.toString()})`;
    },

    /*
    * builds an insert query that inserts the provided columns and values
    * */
    buildInsertQueryWithValues: (tableName, columns, values) => {
      if (columns.length !== values.length) return null;

      values.forEach((value, index, arr) => { arr[index] = mysql.escape(value); });

      return `insert into ${tableName} (${columns.toString()}) values (${values.toString()})`;
    },

    buildInsertQueryWithListOfValues: (tableName, columns, listOfValues) => {
        if (columns.length !== listOfValues[0].length) return null;

        listOfValues.forEach((values, index, arrOfArr) => {
            values.forEach((value, index, arr) => { arr[index] = mysql.escape(value); });
            arrOfArr[index] = values;
        });

        let insertQuery = `insert into ${tableName} (${columns.toString()}) values `;
        let firstTime = true;
        listOfValues.forEach((values) => {
            if (firstTime){
                insertQuery += `(${values.toString()})`;
                firstTime = false;
            }
            else{
                insertQuery += `, (${values.toString()})`;
            }
        });

        return insertQuery;
    },
    //--------------------------------SELECT
    buildSelectQuery: (tableName, columns = [], whereConditions = null) =>{
        return `select ${columns.length === 0 ? '*' : columns.toString()} from ${tableName}` + buildWhereCondition(whereConditions);
    },

    /**
     * jointColumns - takes in 2 values, column of first table and column of second table
     * whereConditions - takes in a json array of values to use in the where clause, key -> tableName.ColumnName
     * */
    buildInnerJoinedSelectQuery: (firstTable, secondTable, jointColumns, firstTableColumns, secondTableColumns,
                                  whereConditions = null) => {

        //concatenate columns with tableNames
        jointColumns[0] = firstTable + '.' + jointColumns[0];
        jointColumns[1] = secondTable + '.' + jointColumns[1];

        firstTableColumns.forEach((value, index, arr) => { arr[index] = firstTable + '.' + value; });
        secondTableColumns.forEach((value, index, arr) => { arr[index] = secondTable + '.' + value; });

        const targetColumns = firstTableColumns.concat(secondTableColumns);

        let query = `select ${targetColumns} from ${firstTable} inner join ${secondTable} on ${jointColumns[0]} = 
        ${jointColumns[1]}`;

        query += buildWhereCondition(whereConditions);

        return query;
    },

    /**
     * builds a select query that joins a table with its associated columns
     * listOfTables - list of tables to perform inner join on (e.g. table1, table2)
     * listOfOnJoinColumns - list of columns (col1, col2) to perform inner join on (e.g. inner join on table1.col1 = table2.col2)
     * listOfTargetColumns - 2d array that specifies the columns for each table to be selected. (e.g.
     * [
     * [table 1 columns],
     * [table 2 columns]
     * ]
     * , if there are no columns to be selected, leave as empty list)
     * neighborJoinMethod - (default value = false) if set to true, inner join is performed on neighbor tables, if false,
     * all tables are joined with the first table
     * listOfFirstTableColumnsToJoinOn - if neighbor method is set to false, these joint columns are used
     * whereConditions - (default value = null) takes in a json array of values to use in the where clause, key -> tableName.ColumnName
     *
    * */
    buildAssociatedInnerJoin: (listOfTables, listOfOnJoinColumns, listOfTargetColumns = [], neighborJoinMethod = false,
                               listOfFirstTableColumnsToJoinOn = [], whereConditions = null) => {

        const tableLength = listOfTables.length;
        const joinColumnLength = listOfOnJoinColumns.length;
        const targetColumnLength = listOfTargetColumns.length;

        //verify if the provided inputs are valid
        if (!(tableLength === joinColumnLength && joinColumnLength === targetColumnLength)) return null;

        //build the inner join on columns
        //build the target columns

        let targetColumns = '';

        for (let i = 0; i < tableLength; i++){
            const tableName = listOfTables[i];
            const joinColumn = listOfOnJoinColumns[i];
            //get the target columns to be selected
            const targetSelectionColumns = listOfTargetColumns[i];

            //concatenate the on join columns with their respective table name
            listOfOnJoinColumns[i] = `${tableName}.${joinColumn}`;

            if (targetSelectionColumns.length !== 0){
                //concatenate the target columns with their respective table
                for (let j = 0; j < targetSelectionColumns.length; j++){
                    targetSelectionColumns[j] = `${tableName}.${targetSelectionColumns[j]}`
                }

                if (targetColumns === ''){
                    targetColumns = targetColumns.concat(targetSelectionColumns);
                }
                else{
                    targetColumns = targetColumns.concat(',').concat(targetSelectionColumns);
                }
                /*targetColumns = targetColumns.concat(targetSelectionColumns)
                    .concat((i + 1 === listOfTables.length) ? '' : ',');*/
            }

            //in case if neighbor join method is not being used
            if (i === 0 && listOfFirstTableColumnsToJoinOn.length !== 0){
                for (let j = 0; j < listOfFirstTableColumnsToJoinOn.length; j++){
                    listOfFirstTableColumnsToJoinOn[j] = `${tableName}.${listOfFirstTableColumnsToJoinOn[j]}`;
                }
            }
        }

        const baseTableName = listOfTables[0];

        let query = `select ${targetColumns} from `;

        let joinRules = `${baseTableName}`;

        for (let i = 1; i < listOfOnJoinColumns.length; i++){
            query += `(`;

            const onColumn = neighborJoinMethod ? listOfOnJoinColumns[i - 1] : listOfFirstTableColumnsToJoinOn[i - 1];

            joinRules += ` inner join ${listOfTables[i]} on ${onColumn} = ${listOfOnJoinColumns[i]})`
        }

        query += joinRules;
        query += buildWhereCondition(whereConditions);

        return query;
    },
    /**
     * jointColumns - takes in 3 values, column of first table, column of second table and column of third table
     * whereConditions - takes in a json array of values to use in the where clause, key -> tableName.ColumnName
     * */
    buildInnerJoinedSelectQuery2: (firstTable, secondTable, thirdTable, jointColumns, firstTableColumns, secondTableColumns,
                                    thirdTableColumns,whereConditions = null) => {

        //concatenate columns with tableNames
        jointColumns[0] = firstTable + '.' + jointColumns[0];
        jointColumns[1] = secondTable + '.' + jointColumns[1];
        jointColumns[2] = thirdTable + '.' + jointColumns[2];

        firstTableColumns.forEach((value, index, arr) => { arr[index] = firstTable + '.' + value; });
        secondTableColumns.forEach((value, index, arr) => { arr[index] = secondTable + '.' + value; });
        thirdTableColumns.forEach((value, index, arr) => { arr[index] = thirdTable + '.' + value; });

        const targetColumns = firstTableColumns.concat(secondTableColumns).concat(thirdTableColumns);


        let query = `select ${targetColumns} from ${firstTable} inner join ${secondTable} on ${jointColumns[0]} = 
        ${jointColumns[1]}`;


        query+=` inner join ${thirdTable} on ${jointColumns[1]} = ${jointColumns[2]} `;

        query += buildWhereCondition(whereConditions);


        return query;
    },

    //--------------------------------UPDATE

    /*
    *builds update query that updates the provided table using columns, values and where conditions
    * */
    buildUpdateQuery: (tableName, columns, values, whereConditions) => {
        if (columns.length !== values.length) return null;

        let query = `update ${tableName} set `;

        const updateSet = [];

        for(let i = 0; i < columns.length; i++){
            updateSet.push(columns[i] + ' = ' + mysql.escape(values[i]));
        }

        query += updateSet.toString();
        query += buildWhereCondition(whereConditions);

        return query;
    },

    /*
    *builds delete query that removes a row from the table given where conditions
    * */
    buildDeleteQuery: (tableName,  whereConditions) => {

        let query = `delete from ${tableName}  `;

        query += buildWhereCondition(whereConditions);

        return query;
    },

    /*
    * creates a list of values from a json object
    * */
    extractValuesByColumns: (data, columns) => {
        const values = [];

        for (let i = 0; i < columns.length; i++){
            const column = columns[i];
            const value = data[column];

            values.push(value);
        }

        return values;
    }
}

/*
* builds where conditions for sql queries
* the function takes in a json array of json objects {column => value}
* then returns a where clause string
* */
function buildWhereCondition(whereConditions, inclusive = true) {
    if (whereConditions !== null){
        let query = ' where ';

        const conditions = [];

        Object.keys(whereConditions).forEach((key) => {
            conditions.push(key + ' = ' + mysql.escape(whereConditions[key]));
        });

        query += conditions.join(inclusive ? ' and ' : ' or ');

        return query;
    }

    return '';
}
