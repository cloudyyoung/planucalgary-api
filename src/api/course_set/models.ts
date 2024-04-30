import mongoose from 'mongoose';

const { Schema, connection } = mongoose;

interface CatalogCourseSetProps {

}

const CatalogCourseSetSchema = new Schema<CatalogCourseSetProps>({

}, {
  timestamps: true
});

const catalog = connection.useDb('catalog');
const CatalogCourseSet = catalog.model('Program', CatalogCourseSetSchema)
export { CatalogCourseSet }
