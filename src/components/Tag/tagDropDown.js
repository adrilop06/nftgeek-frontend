import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from 'react-select';
import { fetchTagAction } from "../../redux/slices/tag/tagSlices";



const TagDropDown = props => {
  //dispatch action
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTagAction());
  }, [dispatch]);
  //select Tag
  const tag = useSelector(state => state?.tag);
  const { tagList, loading, appErr, serverErr } = tag;

  const tags = tagList?.map(tag => {
    return {
      label: tag?.name,
      value: tag?.id,
      
    };
  });

  
  //handleChange
  const handleChange = value => {
    props.onChange("tag", value);
 
  };

  
  //handleBlur
  const handleBlur = () => {
    props.onBlur("tag", true);
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      {loading ? (
        <h3 className="text-base text-green-600">
          Cargando etiquetas...
        </h3>
      ) : (
        //onChange={(opt, meta) => console.log(opt, meta)}
        <Select
          isCreatable={true}
          onChange={handleChange}
          onBlur={handleBlur}
          id="tag"
          options={tags}
          value={props?.value}
          label={props?.label}
        />
      
      )}
      {/* Display */}
      {props?.error && (
        <div style={{ color: "red", marginTop: ".5rem" }}>{props?.error}</div>
      )}
    </div>
  );
};

export default TagDropDown;
