import * as React from "react";
import i18n from "@sitevision/api/common/i18n";
import TextInput from "../TextInput";
import router from "@sitevision/api/common/router";
import requester from "@sitevision/api/client/requester";
import toasts from "@sitevision/api/client/toasts";
import events from "@sitevision/api/common/events";

const App = () => {
  const onSubmitPress = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    requester
      .doPost({
        url: router.getStandaloneUrl("/upload"),
        data: formData,
        fileUpload: true,
      })
      .then(() => {
        form.reset();
        toasts.publish({
          message: i18n.get("Upload success"),
          type: "success",
        });
        events.trigger("eventImage:reload");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form
      onSubmit={onSubmitPress}
      className="env-form"
      encType="multipart/form-data"
    >
      <TextInput name="name" type="text" />
      <TextInput name="email" type="email" />
      <TextInput name="description" type="text" />
      <div className="env-form-element">
        <label htmlFor="file" className="env-form-element__label">
          {i18n.get("image")}
        </label>
        <div className="env-form-element__control">
          <input id="file" type="file" name="file" accept="image/*" required />
        </div>
      </div>
      <div className="env-form-element">
        <button type="submit" className="env-button env-button--primary">
          {i18n.get("uploadImage")}
        </button>
      </div>
    </form>
  );
};

export default App;
